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

  async getModelDetail(id: string) {
    return await this.prisma.model.findFirst({
      where: {
        id,
      },
      include: {
        modelColors: {
          orderBy: {
            order: 'asc',
          },
        },
        modelExamples: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async getModelCustomSelections(id: string) {
    return await this.prisma.model.findFirst({
      where: {
        id,
      },
      select: {
        modelFloorOptions: {
          select: {
            name: true,
            order: true,
            price: true,
            isDefault: true,
            modelSecondOptions: {
              select: {
                name: true,
                optionDetails: {
                  select: {
                    order: true,
                    name: true,
                    price: true,
                    isDefault: true,
                  },
                },
              },
            },
          },
        },
      },
      // include: {
      //   modelFloorOptions: {
      //     include: {
      //       modelSecondOptions: {
      //         include: {
      //           optionDetails: {}
      //         }
      //       }
      //     },
      //   }
      // },
      orderBy: {
        order: 'asc',
      },
    });
  }
}
