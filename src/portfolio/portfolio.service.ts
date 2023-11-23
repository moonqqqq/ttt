import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreatePortfolioReqDTO } from './dtos/create-portfolio.dto';
import { UpdatePortfolioReqDTO } from './dtos/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortfolios(size?: number) {
    const where = size ? { size } : {};
    return await this.prisma.portfolio.findMany({
      where,
    });
  }

  async createPortfolio(body: CreatePortfolioReqDTO) {
    return await this.prisma.portfolio.create({
      data: body,
    });
  }

  async updatePortfolio(id: string, body: UpdatePortfolioReqDTO) {
    return await this.prisma.portfolio.update({
      where: {
        id,
      },
      data: body,
    });
  }
}
