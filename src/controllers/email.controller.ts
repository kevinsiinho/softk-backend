import {inject} from '@loopback/core';
import {Response, RestBindings, post, requestBody} from '@loopback/rest';
import nodemailer from 'nodemailer';

export class EmailController {
  constructor() {}

  @post('/send-email')
  async sendEmail(
    @requestBody() request: { destinatario: string; asunto: string; cuerpo: string },
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<void> {
    try {
      const { destinatario, asunto, cuerpo } = request;

      // Validar que los campos requeridos no están vacíos
      if (!destinatario || !asunto || !cuerpo) {
        response.status(400).end();
        return;
      }

      // Configurar el servicio de transporte de nodemailer
      const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'softk0131@hotmail.com',
          pass: 'Kevin1045.',
        },
        tls: {
          ciphers: 'SSLv3'
        }
      });

      // Configurar el correo electrónico
      const mailOptions = {
        from: 'softk0131@hotmail.com',
        to: destinatario,
        subject: asunto,
        html: cuerpo,
      };

      // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);

      response.status(200).end();
    } catch (error) {
      response.status(500).end();
    }
  }
}
