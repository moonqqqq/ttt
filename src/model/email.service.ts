import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  transport: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private configService: ConfigService) {
    this.transport = createTransport({
      host: configService.get('NODEMAILER_HOST'),
      secure: true,
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: configService.get('NODEMAILER_USER'),
        pass: configService.get('NODEMAILER_PASS'),
      },
    });
  }

  async sendReceiptEmail(email: string) {
    const mailOptions = {
      from: this.configService.get('NODEMAILER_SENDER'),
      to: email,
      subject: 'subject',
      html: ``,
    };
    await this.sendMail(mailOptions);
  }

  private async sendMail(
    mailOptions: { from: string; to: string; subject: string; html: string },
    retryCount: number = 0,
  ) {
    if (retryCount > 2) {
      throw new InternalServerErrorException();
    }
    try {
      await this.transport.sendMail(mailOptions);
    } catch (e) {
      await this.sendMail(mailOptions, retryCount + 1);
    }
  }
}
