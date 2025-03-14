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
        service: 'gmail',
        auth: {
          user: 'softk0131@gmail.com',
          pass: 'nvrx rxzs mzyi rqes',
        },
      });

      // Configurar el correo electrónico
      const mailOptions = {
        from: 'softk0131@gmail.com',
        to: destinatario,
        subject: asunto,
        html: cuerpo,
      };

      // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);

      response.status(200).end();
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      response.status(500).send({ error: error.message });
    }
  }
}
