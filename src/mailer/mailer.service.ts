import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from 'src/common/dto';

@Injectable()
export class MailerService {
  constructor() {}

  mailTransport() {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    return transporter;
  }

  async sendEmail(dto: SendEmailDto) {
    const { recipients, subject, html} = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: {
        name: process.env.EMAIL_NAME,
        address: process.env.DEFAULT_EMAIL,
      },
      to: recipients,
      subject,
      html
    }
    try {
      const result = await transport.sendMail(options);

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}