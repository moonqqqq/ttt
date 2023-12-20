import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(body) {
    await this.prisma.reservation.create({
      data: body,
    });
    const { model: model, user, result } = this.#createReservationReceipt(body);
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
    model.value = foundModel.name;

    return {
      user,
      model,
      options: result,
      totalPrice: this.#calculateTotalPrice(foundModel.minPrice, result),
    };
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

  #createReservationReceipt(reservation) {
    const data = reservation.data;

    const colorFiltered = data.modelColors.filter(
      (each) => each?.isSelected == true,
    )[0];

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
    // result.push({user: {
    //     name: reservation.name,
    //     email: reservation.email
    // }})
    const user = { name: reservation.name, email: reservation.email };

    // result.push({name: "모델", id: colorFiltered.modelId, value: "", imageURL: colorFiltered.imageURL});
    const model = {
      name: '모델',
      id: colorFiltered.modelId,
      value: '',
      imageURL: colorFiltered.imageURL,
    };
    result.push({ name: '외장재 색상', value: colorFiltered.name });
    result.push({
      name: '층수 형태',
      value: floorFiltered.name,
      price: floorFiltered.price,
    });
    result.push(
      ...secondOptionFiltered.map((each) => {
        return {
          name: each.name,
          value: each.optionDetails[0]?.name,
          price: each.optionDetails[0]?.price,
        };
      }),
    );
    if (kitchenFiltered?.options && kitchenFiltered?.options.length > 0) {
      result.push(
        ...kitchenFiltered?.options?.map((each) => {
          return {
            name: each.name,
            value: each.optionDetails[0]?.name,
          };
        }),
      );
    }
    result = result.filter((each) => each.value);

    return { model, user, result };
  }
}
