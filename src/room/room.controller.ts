import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import ResWrapper from '../shared/utils/res-wrapper.static';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(`${API_ENDPOINT.ROOM}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.ROOM}`)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOkResponse({
    schema: {
      example: [
        {
          name: 'EVO',
          size: '10',
          price: '3500000~',
          savedURL:
            'https://backend-boil.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-11-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.12.38.png1700108132688.png',
        },
      ],
    },
  })
  async getRoomsMock() {
    const mockData = [
      {
        name: 'EVO',
        size: '10',
        price: '3500000~',
        savedURL:
          'https://backend-boil.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-11-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.12.38.png1700108132688.png',
      },
      {
        name: 'NOVA',
        size: '10',
        price: '3500000~',
        savedURL:
          'https://backend-boil.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-11-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.16.00.png1700108218292.png',
      },
      {
        name: 'MAX',
        size: '10',
        price: '3500000~',
        savedURL:
          'https://backend-boil.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-11-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.16.10.png1700108234792.png',
      },
      {
        name: 'Studio',
        size: '10',
        price: '3500000~',
        savedURL:
          'https://backend-boil.s3.ap-northeast-2.amazonaws.com/image/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-11-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.16.21.png1700108248894.png',
      },
    ];
    return ResWrapper.list(mockData);
  }
}
