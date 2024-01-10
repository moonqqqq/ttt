import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ILoggerService } from '../logger/interface/logger-service.interface';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILoggerService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const fiveMinutesAgo = new Date(Date.now() - 7 * 60 * 1000);
    this.logger.info('corn runs');
    await this.#fixModelFloorOptionJoinKey(fiveMinutesAgo);
    await this.#fixModelSecondOptionJoinKey(fiveMinutesAgo);
    await this.#fixOptionDetailJoinKey(fiveMinutesAgo);
    await this.#fixModelKitchenTypeJoinKey(fiveMinutesAgo);
    await this.#fixModelKitchenOptionJoinKey(fiveMinutesAgo);
    await this.#fixKitchenOptionDetailJoinKey(fiveMinutesAgo);
    await this.#fixModelColorJoinKey(fiveMinutesAgo);
    await this.#fixModelExampleJoinKey(fiveMinutesAgo);
  }

  async #fixModelFloorOptionJoinKey(before: Date) {
    const result = await this.prisma.modelFloorOption.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelId !== each.modelIdSubstitude) {
          await this.prisma.modelFloorOption.update({
            where: {
              id: each.id,
            },
            data: {
              modelId: each.modelIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixModelSecondOptionJoinKey(before: Date) {
    const result = await this.prisma.modelSecondOption.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelFloorOptionId !== each.modelFloorOptionIdSubstitude) {
          await this.prisma.modelSecondOption.update({
            where: {
              id: each.id,
            },
            data: {
              modelFloorOptionId: each.modelFloorOptionIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixOptionDetailJoinKey(before: Date) {
    const result = await this.prisma.optionDetail.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.ModelSecondOptionId !== each.modelSecondOptionIdSubstitude) {
          await this.prisma.optionDetail.update({
            where: {
              id: each.id,
            },
            data: {
              ModelSecondOptionId: each.modelSecondOptionIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixModelKitchenTypeJoinKey(before: Date) {
    const result = await this.prisma.modelKitchenType.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelFloorOptionId !== each.modelFloorOptionIdSubstitude) {
          await this.prisma.modelKitchenType.update({
            where: {
              id: each.id,
            },
            data: {
              modelFloorOptionId: each.modelFloorOptionIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixModelKitchenOptionJoinKey(before: Date) {
    const result = await this.prisma.modelKitchenOption.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelKitchenTypeId !== each.modelKitchenTypeIdSubstitude) {
          await this.prisma.modelKitchenOption.update({
            where: {
              id: each.id,
            },
            data: {
              modelKitchenTypeId: each.modelKitchenTypeIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixKitchenOptionDetailJoinKey(before: Date) {
    const result = await this.prisma.kitchenOptionDetail.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelKitchenOptionId !== each.modelKitchenOptionIdSubstitude) {
          await this.prisma.kitchenOptionDetail.update({
            where: {
              id: each.id,
            },
            data: {
              modelKitchenOptionId: each.modelKitchenOptionIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixModelColorJoinKey(before: Date) {
    const result = await this.prisma.modelColor.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelId !== each.modelIdSubstitude) {
          await this.prisma.modelColor.update({
            where: {
              id: each.id,
            },
            data: {
              modelId: each.modelIdSubstitude,
            },
          });
        }
      }
    }
  }

  async #fixModelExampleJoinKey(before: Date) {
    const result = await this.prisma.modelExample.findMany({
      where: {
        createdAt: {
          gt: before,
        },
      },
    });
    if (result.length > 0) {
      for await (const each of result) {
        if (each.modelId !== each.modelIdSubstitude) {
          await this.prisma.modelExample.update({
            where: {
              id: each.id,
            },
            data: {
              modelId: each.modelIdSubstitude,
            },
          });
        }
      }
    }
  }
}
