import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { MEDIA_TYPES } from './interfaces/media-enum.interface';
import { CreateMediaReqDTO } from './dtos/create-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async createMedia(body: CreateMediaReqDTO) {
    return await this.prisma.media.create({
      data: body,
    });
  }

  async getMedia(type?: MEDIA_TYPES) {
    const where = type ? { type } : {};

    return await this.prisma.media.findMany({ where });
  }
}
