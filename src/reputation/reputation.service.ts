import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class ReputationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReputation(body) {
    return await this.prisma.reputation.create({
      data: body,
    });
  }

  async getReputation() {
    return await this.prisma.reputation.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async updateReputation(id: string, body) {
    return await this.prisma.reputation.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteReputation(id: string) {
    try {
      await this.prisma.reputation.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') throw new NotFoundException('Wrong id');
    }
  }
}
