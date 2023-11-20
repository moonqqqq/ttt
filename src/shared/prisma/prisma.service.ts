import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const options: Prisma.PrismaClientOptions = {
      errorFormat: 'pretty',
      log: [{ level: 'info', emit: 'stdout' }],
    };

    super(options);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
