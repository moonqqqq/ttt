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

  async getOtherModels(id: string) {
    return await this.prisma.model.findMany({
      where: {
        id: {
          not: id,
        },
      },
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

  async getModelCustomSelections(id: string, language: 'KO' | 'EN') {
    const result = await this.prisma.model.findFirst({
      where: {
        id,
      },
      select: {
        modelColors: {},
        modelFloorOptions: {
          select: {
            id: true,
            name: true,
            nameKO: true,
            order: true,
            price: true,
            isDefault: true,
            modelSecondOptions: {
              select: {
                name: true,
                nameKO: true,
                isMultipleSelectable: true,
                optionDetails: {
                  select: {
                    order: true,
                    name: true,
                    nameKO: true,
                    price: true,
                    isDefault: true,
                  },
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
            ModelKitchenTypes: {
              select: {
                name: true,
                nameKO: true,
                order: true,
                options: {
                  select: {
                    name: true,
                    nameKO: true,
                    isMultipleSelectable: true,
                    optionDetails: {
                      select: {
                        name: true,
                        nameKO: true,
                        order: true,
                        price: true,
                        isDefault: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (language === 'KO') return translateToKO(result as any);
    return result as any;
  }
}

function translateToKO(result) {
  result.modelColors.forEach((each) => {
    each.name = each.nameKO;
    delete each.nameKO;
  });
  result.modelFloorOptions.forEach((each) => {
    each.name = each.nameKO;
    delete each.nameKO;
    each.modelSecondOptions.forEach((eachSecond) => {
      eachSecond.name = eachSecond.nameKO;
      delete eachSecond.nameKO;
      eachSecond.optionDetails.forEach((eachDetail) => {
        eachDetail.name = eachDetail.nameKO;
        delete eachDetail.nameKO;
      });
    });
    if (each.ModelKitchenTypes && each.ModelKitchenTypes.length > 0) {
      each.ModelKitchenTypes.forEach((kitchenType) => {
        kitchenType.name == kitchenType.nameKO;
        delete kitchenType.nameKO;
        kitchenType.options.forEach((kitchenOption) => {
          kitchenOption.name = kitchenOption.nameKO;
          delete kitchenOption.nameKO;
        });
      });
    }
  });
  return result;
}
