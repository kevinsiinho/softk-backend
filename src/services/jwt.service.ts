import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import jwt from 'jsonwebtoken';

export class MyJWTService implements TokenService {
  constructor(
    @inject('authentication.jwt.secret')
    private jwtSecret: string,
    @inject('authentication.jwt.expiresIn')
    private jwtExpiresIn: string,
  ) { }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('No se puede generar token sin perfil de usuario');
    }

    try {
      // Aquí extraemos el id del userProfile usando securityId
      const tokenPayload = {
        id: userProfile[securityId],
      };

      const token = jwt.sign(tokenPayload, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
      });
      return token;
    } catch (err) {
      throw new HttpErrors.Unauthorized('Error al generar el token.');
    }
  }


  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized('Token no provisto');
    }

    try {
      const decodedToken: any = jwt.verify(token, this.jwtSecret);
      const userProfile: UserProfile = {
        [securityId]: decodedToken.id,
      };
      return userProfile;
    } catch (err) {
      throw new HttpErrors.Unauthorized('Token inválido o expirado.');
    }
  }

}
