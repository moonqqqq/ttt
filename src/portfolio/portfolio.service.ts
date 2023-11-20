import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolios(size?: number) {
    const where = size ? { size } : {};
    return await this.prisma.portfolio.findMany({
      where,
      include: { images: { select: { url: true } } },
    });
  }
}
