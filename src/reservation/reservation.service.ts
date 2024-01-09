import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { EmailService } from './email.service';
import { LANGUAGE, LANGUAGE_TYPE } from '../shared/constants/language';
import { extractStringBeforeFirstParenthesis } from '../model/model.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createReservation(body, language: LANGUAGE_TYPE) {
    const reservation = await this.prisma.reservation.create({
      data: body,
    });
    const {
      model: model,
      user,
      result,
      resultOpposite,
    } = this.#createReservationReceipt(body, language);

    let resultKO;
    let resultEN;
    if (language == LANGUAGE.KO) {
      resultKO = result;
      resultEN = resultOpposite;
    }
    if (language == LANGUAGE.EN) {
      resultKO = resultOpposite;
      resultEN = result;
    }

    const foundModel = await this.prisma.model.findFirst({
      where: {
        id: model.id,
      },
      select: {
        id: true,
        name: true,
        minPrice: true,
      },
    });
    model.name = foundModel.name;

    const totalPrice = this.#calculateTotalPrice(foundModel.minPrice, result);

    const optionsEN = {};
    const optionsKO = {};

    // TODO: make below two foreach to one for loop
    resultKO.forEach((item) => {
      optionsKO[item.name] = item.value;
    });
    resultEN.forEach((item) => {
      optionsEN[extractStringBeforeFirstParenthesis(item.name)] = item.value;
    });

    const receipt = await this.prisma.reservationReceipt.create({
      data: {
        reservationId: reservation.id,
        user,
        model,
        options: optionsEN,
        optionsKO,
        totalPrice,
      },
    });

    await this.emailService.sendReceiptEmail(receipt, model as any, language);

    return reservation;
  }

  #calculateTotalPrice(minPrice: number, options: any[]) {
    let totalPrice = minPrice;
    options.forEach((each) => {
      if (each.price) {
        totalPrice += each.price;
      }
    });

    return totalPrice;
  }

  #createReservationReceipt(
    reservation,
    language: LANGUAGE_TYPE = LANGUAGE.KO,
  ) {
    const data = reservation.data;

    let colorFiltered = data.modelColors.filter(
      (each) => each?.isSelected == true,
    )[0];

    if (!colorFiltered) {
      colorFiltered = data.modelColors.filter(
        (each) => each?.isDefault == true,
      )[0];
    }

    const floorFiltered = data.modelFloorOptions.filter(
      (each) => each?.isSelected == true,
    )[0];
    const secondOptionFiltered = floorFiltered.modelSecondOptions.map(
      (secondOption) => {
        secondOption.optionDetails = secondOption.optionDetails.filter(
          (optionDetail) => optionDetail?.isSelected == true,
        );
        return secondOption;
      },
    );

    const kitchenFiltered = floorFiltered?.ModelKitchenTypes?.filter(
      (each) => each?.isSelected == true,
    )[0];
    kitchenFiltered?.options?.forEach((kitchenOption) => {
      kitchenOption.optionDetails = kitchenOption.optionDetails.filter(
        (option) => option?.isSelected == true,
      );
    });

    let result = [];
    let resultOpposite = [];

    const user = {
      name: reservation.name,
      email: reservation.email,
      phoneNumber: reservation.phoneNumber,
    };

    const model = {
      name: '',
      id: colorFiltered.modelId,
      imageURL: colorFiltered.imageURLNBG || colorFiltered.imageURL,
    };
    const exterialColor =
      language == LANGUAGE.KO ? '외장재 색상' : 'Exterior material type';
    const exterialColorOpposite =
      language == LANGUAGE.KO ? 'Exterior material type' : '외장재 색상';
    result.push({ name: `${exterialColor}`, value: colorFiltered.name });
    resultOpposite.push({
      name: `${exterialColorOpposite}`,
      value: colorFiltered.nameKO,
    });

    const floorType = language == LANGUAGE.KO ? '층수 형태' : 'Floor type';
    const floorTypeOpposite =
      language == LANGUAGE.KO ? 'Floor type' : '층수 형태';
    result.push({
      name: `${floorType}`,
      value: floorFiltered.name,
      price: floorFiltered.price,
    });
    resultOpposite.push({
      name: `${floorTypeOpposite}`,
      value: floorFiltered.nameKO,
      price: floorFiltered.price,
    });
    result.push(
      ...secondOptionFiltered.map((each) => {
        return {
          name: each.name,
          value: each.optionDetails.map((each) => each.name),
          price: each.optionDetails.reduce(
            (accumulator, each) => accumulator + each.price,
            0,
          ),
        };
      }),
    );
    resultOpposite.push(
      ...secondOptionFiltered.map((each) => {
        return {
          name: each.nameKO,
          value: each.optionDetails.map((each) => each.nameKO),
          price: each.optionDetails.reduce(
            (accumulator, each) => accumulator + each.price,
            0,
          ),
        };
      }),
    );
    if (kitchenFiltered?.options && kitchenFiltered?.options.length > 0) {
      result.push(
        ...kitchenFiltered?.options?.map((each) => {
          return {
            name: each.name,
            value: each.optionDetails.map((each) => each.name),
            price: each.optionDetails.reduce(
              (accumulator, each) => accumulator + each.price,
              0,
            ),
          };
        }),
      );
      resultOpposite.push(
        ...kitchenFiltered?.options?.map((each) => {
          return {
            name: each.nameKO,
            value: each.optionDetails.map((each) => each.nameKO),
            price: each.optionDetails.reduce(
              (accumulator, each) => accumulator + each.price,
              0,
            ),
          };
        }),
      );
    }
    result = result.filter((each) => {
      if (Array.isArray(each.value)) {
        if (each.value.length > 0) return true;
      } else {
        return each.value ? true : false;
      }
    });
    resultOpposite = resultOpposite.filter((each) => {
      if (Array.isArray(each.value)) {
        if (each.value.length > 0) return true;
      } else {
        return each.value ? true : false;
      }
    });

    return { model, user, result, resultOpposite };
  }

  async getReservationReceipt(id: string) {
    return await this.prisma.reservationReceipt.findFirst({
      where: {
        reservationId: id,
      },
    });
  }
}
