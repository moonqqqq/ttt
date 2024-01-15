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
      kitchenFiltered,
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

    const floorOption = result.find(
      (each) => each.name === '층수 형태' || each.name === 'Floor type',
    );

    const totalPrice = this.#calculateTotalPrice(floorOption.price, result);

    const optionsEN = {};
    const optionsKO = {};

    // TODO: make below two foreach to one for loop
    resultKO.forEach((item) => {
      if (!item.value.includes('미선택')) {
        optionsKO[item.name] = optionsKO[item.name]
          ? [...optionsKO[item.name], ...item.value]
          : item.value;
      }
    });
    resultEN.forEach((item) => {
      if (!item.value.includes('Not Selected')) {
        optionsEN[extractStringBeforeFirstParenthesis(item.name)] = optionsEN[
          extractStringBeforeFirstParenthesis(item.name)
        ]
          ? [
              ...optionsEN[extractStringBeforeFirstParenthesis(item.name)],
              ...item.value,
            ]
          : item.value;
      }
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

    const receiptV2Data = {
      username: receipt.user['name'],
      email: receipt.user['email'],
      phoneNumber: receipt.user['phoneNumber'],
      address: body['address'],
      modelName: receipt.model['name'],
      type: receipt.optionsKO['층수 형태']
        ? String(receipt.optionsKO['층수 형태'])
        : '',
      exteriorMaterial: receipt.optionsKO['외장재 색상']
        ? String(receipt.optionsKO['외장재 색상'])
        : '',
      deck: receipt.optionsKO['데크'] ? String(receipt.optionsKO['데크']) : '',
      canopy: receipt.optionsKO['캐노피']
        ? String(receipt.optionsKO['캐노피'])
        : '',
      exteriorLighting: receipt.optionsKO['외부 조명']
        ? String(receipt.optionsKO['외부 조명'])
        : '',
      bathroom: receipt.optionsKO['화장실']
        ? String(receipt.optionsKO['화장실'])
        : '',
      kitchenType: extractStringBeforeFirstParenthesis(kitchenFiltered?.nameKO), // !
      selectiedFurniture: receipt.optionsKO['가구']
        ? String(receipt.optionsKO['가구'])
        : '',
      selectedKitchenAppliances: receipt.optionsKO['주방 기기옵션']
        ? String(receipt.optionsKO['주방 기기옵션'])
        : '',
      additionalOptions: receipt.optionsKO['기타옵션']
        ? String(receipt.optionsKO['기타옵션'])
        : '',
      totalPrice: receipt.totalPrice,
      createdAt: this.makeExcelStyleTimestamp(),
    };

    await this.prisma.reservationReceiptV2.create({
      data: receiptV2Data,
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

    return { model, user, result, resultOpposite, kitchenFiltered };
  }

  async getReservationReceipt(id: string) {
    return await this.prisma.reservationReceipt.findFirst({
      where: {
        reservationId: id,
      },
    });
  }

  makeExcelStyleTimestamp() {
    // Create a new Date object
    const currentDate: Date = new Date();

    // Get the individual components of the date
    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Months are zero-based
    const year: number = currentDate.getFullYear();
    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();
    const seconds: number = currentDate.getSeconds();

    // Format the components as two-digit numbers
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      seconds < 10 ? `0${seconds}` : `${seconds}`;

    // Create the formatted timestamp string
    const formattedTimestamp: string = `${year}/${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedTimestamp;
  }
}
