import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private readonly prisma: PrismaService) {}

  async getModelsForNavigation() {
    return await this.prisma.model.findMany({
      include: {
        modelColors: {},
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async getModelsForDefault() {
    return await this.prisma.model.findMany({
      select: {
        id: true,
        representativeImageURL: true,
        name: true,
        purpose: true,
        minPrice: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
}
