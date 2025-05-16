// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserCredentials,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  put,
  requestBody,
  response,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import lodashLibrary from 'lodash';
import {User2} from '../models';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 5,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @get('/users')
  @response(200, {
    description: 'Array of user model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User2,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User2, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: User2,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      lodashLibrary.omit(newUserRequest, 'password'),
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});

    return savedUser;
  }


  @get('/whoAmI/{id}', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              schema: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async whoAmI2(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @get('/credenciales/{id}', {
    responses: {
      '200': {
        description: 'Return current credenciales',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCredentials, {includeRelations: true}),
          },
        },
      },
    },
  })
  async credenciales(
    @param.path.string('id') id: string,
  ): Promise<UserCredentials> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }
    const userCredentials = await this.userRepository.userCredentials(user.id).get();
    if (!userCredentials) {
      throw new HttpErrors.NotFound('User credentials not found');
    }
    return userCredentials;
  }


  @put('/user/{id}')
  @response(204, {
    description: 'Item PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User2,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate('jwt')
  @del('/user/{id}')
  @response(204, {
    description: 'Item DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }


  @put('/user/{id}/password', {
    responses: {
      '204': {
        description: 'User password updated successfully',
      },
    },
  })
  async updatePassword(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              password: {type: 'string'},
            },
            required: ['password'],
          },
        },
      },
    }) passwordData: {password: string},
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }
    const userCredentials = await this.userRepository.userCredentials(user.id).get();
    if (!userCredentials) {
      throw new HttpErrors.NotFound('User credentials not found');
    }
    userCredentials.password = await hash(passwordData.password, await genSalt());
    await this.userRepository.userCredentials(user.id).patch(userCredentials);
  }

  @authenticate('jwt')
  @del('user/credenciales/{id}', {
    responses: {
      '204': {
        description: 'User credentials deleted successfully',
      },
    },
  })
  async deleteCredentials(
    @param.path.string('id') id: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }
    const userCredentials = await this.userRepository.userCredentials(user.id).get();
    if (!userCredentials) {
      throw new HttpErrors.NotFound('User credentials not found');
    }
    await this.userRepository.userCredentials(user.id).delete();
  }

  @get('/users/search', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async search(
    @param.query.string('query') query: string,
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User[]> {
    const where: Where<User> = {
      or: [
        {name: {like: query, options: 'i'}},
        {email: {like: query, options: 'i'}},
        {nickname: {like: query, options: 'i'}},
      ],
    };

    return this.userRepository.find({where, ...filter});
  }
}
