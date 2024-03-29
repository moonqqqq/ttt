import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { LANGUAGE, LANGUAGE_TYPE } from '../shared/constants/language';

@Injectable()
export class ModelService {
  constructor(private readonly prisma: PrismaService) {}

  async getModelsForNavigation(language: LANGUAGE_TYPE = LANGUAGE.KO) {
    const result = await this.prisma.model.findMany({
      include: {
        modelColors: {},
      },
      orderBy: {
        order: 'asc',
      },
    });

    if (language === LANGUAGE.KO) {
      result.forEach((each) => {
        // each.name = each.nameKO;
        each.description = each.descriptionKO;
        (each as any).minPrice = `₩${each.minPrice.toLocaleString('ko-KR')}~`;
        each.insulation = each.insulationKO;
        each.structure = each.structureKO;
        each.windows = each.windowsKO;
        each.furniture = each.furnitureKO;
        each.purpose = each.purposeKO;
        each.purposeDetail = each.purposeDetailKO;
      });

      result.forEach((each) => {
        each.size += '평';
      });
    }

    if (language === LANGUAGE.EN) {
      result.forEach((each) => {
        each.size = Math.floor(Number(each.size) * 3.3) + '㎡';
        (each as any).minPrice = `TBD`;
      });
    }

    return result;
  }

  async getModelsForDefault(language: LANGUAGE_TYPE = LANGUAGE.KO) {
    const result = await this.prisma.model.findMany({
      select: {
        id: true,
        representativeImageURL: true,
        representativeNoBGImageURL: true,
        name: true,
        nameKO: true,
        purpose: true,
        purposeKO: true,
        minPrice: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    if (language === LANGUAGE.KO) {
      result.forEach((each) => {
        // each.name = each.nameKO;
        (each as any).minPrice = `₩${each.minPrice.toLocaleString('ko-KR')}~`;
        each.purpose = each.purposeKO;
      });
    }

    if (language === LANGUAGE.EN) {
      result.forEach((each) => {
        each.name = each.name;
        (each as any).minPrice = `TBD`;
        each.purpose = each.purpose;
      });
    }

    return result;
  }

  async getOtherModels(id: string, language: LANGUAGE_TYPE = LANGUAGE.KO) {
    const result = await this.prisma.model.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: {
        id: true,
        representativeImageURL: true,
        name: true,
        nameKO: true,
        purpose: true,
        purposeKO: true,
        minPrice: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    if (language === LANGUAGE.KO) {
      result.forEach((each) => {
        (each as any).smallName = each.nameKO;
        // each.name = each.nameKO;
        (each as any).minPrice = `₩${each.minPrice.toLocaleString('ko-KR')}~`;
        each.purpose = each.purposeKO;
      });
    }

    if (language === LANGUAGE.EN) {
      result.forEach((each) => {
        (each as any).smallName = each.name;
        each.name = each.name;
        (each as any).minPrice = `TBD`;
        each.purpose = each.purpose;
      });
    }

    return result;
  }

  async getModelDetail(id: string, language: LANGUAGE_TYPE = LANGUAGE.KO) {
    const result = await this.prisma.model.findFirst({
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

    if (language === LANGUAGE.KO) {
      // result.name = result.nameKO;
      result.description = result.descriptionKO;
      (result as any).minPrice = `₩${result.minPrice.toLocaleString('ko-KR')}~`;
      result.insulation = result.insulationKO;
      result.structure = result.structureKO;
      result.windows = result.windowsKO;
      result.furniture = result.furnitureKO;
      result.purpose = result.purposeKO;
      result.purposeDetail = result.purposeDetailKO;
      result.size = result.size + '평형';
    }
    if (language === LANGUAGE.EN) {
      (result as any).minPrice = `TBD`;
      result.size = Math.floor(Number(result.size) * 3.3) + '㎡';
    }
    return result;
  }

  async getModelCustomSelections(
    id: string,
    language: LANGUAGE_TYPE = LANGUAGE.KO,
  ) {
    const result = await this.prisma.model.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        minPrice: true,
        modelColors: {},
        modelFloorOptions: {
          select: {
            id: true,
            name: true,
            nameKO: true,
            order: true,
            price: true,
            isDefault: true,
            threeDFileURL: true,
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
                    groupName: true,
                    meshName: true,
                    blockMeshNames: true,
                    fileURL: true,
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
                price: true,
                isDefault: true,
                order: true,
                meshName: true,
                blockMeshNames: true,
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
                        groupName: true,
                        meshName: true,
                        blockMeshNames: true,
                        fileURL: true,
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

    if (language === LANGUAGE.KO) return translateToKO(result as any);

    return deleteAfterFirstParenthesis(result);
  }
}

function translateToKO(result) {
  result.modelColors.forEach((each) => {
    [each.name, each.nameKO] = [each.nameKO, each.name];
  });
  result.modelFloorOptions.forEach((each) => {
    [each.name, each.nameKO] = [each.nameKO, each.name];

    each.modelSecondOptions.forEach((eachSecond) => {
      [eachSecond.name, eachSecond.nameKO] = [
        eachSecond.nameKO,
        eachSecond.name,
      ];

      eachSecond.optionDetails.forEach((eachDetail) => {
        [eachDetail.name, eachDetail.nameKO] = [
          eachDetail.nameKO,
          eachDetail.name,
        ];
      });
    });
    if (each.ModelKitchenTypes && each.ModelKitchenTypes.length > 0) {
      each.ModelKitchenTypes.forEach((kitchenType) => {
        [kitchenType.name, kitchenType.nameKO] = [
          kitchenType.nameKO,
          kitchenType.name,
        ];
        kitchenType.options.forEach((kitchenOption) => {
          [kitchenOption.name, kitchenOption.nameKO] = [
            kitchenOption.nameKO,
            kitchenOption.name,
          ];
          kitchenOption.optionDetails.forEach((detail) => {
            [detail.name, detail.nameKO] = [detail.nameKO, detail.name];
          });
        });
      });
    }
  });
  return result;
}

function deleteAfterFirstParenthesis(result) {
  result.modelColors.forEach((each) => {
    each.name = extractStringBeforeFirstParenthesis(each.name);
  });
  result.modelFloorOptions.forEach((each) => {
    each.name = extractStringBeforeFirstParenthesis(each.name);
    each.modelSecondOptions.forEach((eachSecond) => {
      eachSecond.name = extractStringBeforeFirstParenthesis(eachSecond.name);
      eachSecond.optionDetails.forEach((eachDetail) => {
        eachDetail.name = extractStringBeforeFirstParenthesis(eachDetail.name);
      });
    });
    if (each.ModelKitchenTypes && each.ModelKitchenTypes.length > 0) {
      each.ModelKitchenTypes.forEach((kitchenType) => {
        kitchenType.name = extractStringBeforeFirstParenthesis(
          kitchenType.name,
        );

        kitchenType.options.forEach((kitchenOption) => {
          kitchenOption.name = extractStringBeforeFirstParenthesis(
            kitchenOption.name,
          );
        });
      });
    }
  });
  return result;
}

export function extractStringBeforeFirstParenthesis(inputString: string) {
  if (!inputString) return '';
  const indexOfFirstParenthesis = inputString.indexOf('(');
  if (indexOfFirstParenthesis !== -1) {
    return inputString.substring(0, indexOfFirstParenthesis).trim();
  } else {
    return inputString.trim();
  }
}
