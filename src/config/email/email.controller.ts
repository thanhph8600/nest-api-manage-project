// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('html') html: string,
  ) {
    try {
      await this.emailService.sendEmail(to, subject, html);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Error sending email' };
    }
  }
}
