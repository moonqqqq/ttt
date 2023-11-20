import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ListResDTO } from '../dtos/list-res.dto';

export const ApiOkListResponse = <DataDTO extends Type<unknown>>(
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(ListResDTO, dataDTO),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDTO) },
              },
            },
          },
        ],
      },
    }),
  );
