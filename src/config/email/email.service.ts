import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (!to) {
      throw new Error('Recipient email address is required.');
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
