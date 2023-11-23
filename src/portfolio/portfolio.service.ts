import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreatePortfolioReqDTO } from './dtos/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolios(size?: number) {
    const where = size ? { size } : {};
    return await this.prisma.portfolio.findMany({
      where,
      include: { images: { select: { id: true, url: true } } },
    });
  }

  async createPortfolio(body: CreatePortfolioReqDTO) {
    return await this.prisma.portfolio.create({
      data: {
        ...body,
        images: {
          create: body.images,
        },
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }
}
