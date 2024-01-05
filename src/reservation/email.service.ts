import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { testTemplate } from './email-template';
import { Model, ReservationReceipt } from '@prisma/client';
import { LANGUAGE_TYPE } from '../shared/constants/language';

@Injectable()
export class EmailService {
  transport: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private configService: ConfigService) {
    this.transport = createTransport({
      host: configService.get('NODEMAILER_HOST'),
      secure: false,
      requireTLS: true,
      port: configService.get('NODEMAILER_PORT'),
      debug: true,
      auth: {
        user: configService.get('NODEMAILER_USER'),
        pass: configService.get('NODEMAILER_PASS'),
      },
    });
  }

  async sendReceiptEmail(
    receipt: ReservationReceipt,
    model: Model,
    language?: LANGUAGE_TYPE,
  ) {
    const mailOptions = {
      from: `Wavyroom <${this.configService.get('NODEMAILER_SENDER')}>`,
      to: (receipt.user as any).email,
      subject: 'Wavyroom 웨이비룸',
      html: testTemplate(receipt, model, language),
    };

    await this.sendMail(mailOptions);
  }

  private async sendMail(
    mailOptions: { from: string; to: string; subject: string; html: string },
    retryCount: number = 0,
  ) {
    if (retryCount > 2) {
      throw new InternalServerErrorException('error on sending email');
    }
    try {
      await this.transport.sendMail(mailOptions);
    } catch (e) {
      await this.sendMail(mailOptions, retryCount + 1);
    }
  }
}
