import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreatePortfolioReqDTO } from './dtos/create-portfolio.dto';
import { UpdatePortfolioReqDTO } from './dtos/update-portfolio.dto';
import {
  PORTFOLIO_SIZE_QUERY,
  PORTFOLIO_SIZE_QUERY_TYPE,
} from './portfolio.constants';
import { LANGUAGE, LANGUAGE_TYPE } from '../shared/constants/language';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  #changeSizeParamToCondition(sizeQuery?: PORTFOLIO_SIZE_QUERY_TYPE) {
    if (!sizeQuery || sizeQuery === PORTFOLIO_SIZE_QUERY.ALL) return null;
    if (sizeQuery === PORTFOLIO_SIZE_QUERY.TO_TEN) return { to: 10 };
    if (sizeQuery === PORTFOLIO_SIZE_QUERY.ELEVEN_TO_TWENTY)
      return { from: 11, to: 20 };
    if (sizeQuery === PORTFOLIO_SIZE_QUERY.TWENTY_TO_THIRTY)
      return { from: 21, to: 30 };
    if (sizeQuery === PORTFOLIO_SIZE_QUERY.MORE_THAN_THIRTY)
      return { from: 31 };
  }

  async getPortfolios(
    language: LANGUAGE_TYPE = LANGUAGE.KO,
    size?: PORTFOLIO_SIZE_QUERY_TYPE,
  ) {
    const sizeFromTo = this.#changeSizeParamToCondition(size);
    const where = sizeFromTo
      ? {
          size: {
            gte: sizeFromTo.from,
            lte: sizeFromTo.to,
          },
        }
      : {};

    const result = await this.prisma.portfolio.findMany({
      where,
    });

    if (language === LANGUAGE.EN) {
      result.forEach((each) => {
        (each as any).size = Math.floor(Number(each.size) * 3.3) + '㎡';
      });
    }

    if (language === LANGUAGE.KO) {
      result.forEach((each) => {
        (each as any).size = each.size + '평';
        each.location = each.locationKO;
      });
    }

    return result;
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
