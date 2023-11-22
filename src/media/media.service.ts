import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { MEDIA_TYPES } from './interfaces/media-enum.interface';
import { CreateMediaReqDTO } from './dtos/create-media.dto';
import { UpdateMediaReqDTO } from './dtos/patch-media.dto';

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

  async updateMedia(id: string, body: UpdateMediaReqDTO) {
    return await this.prisma.media.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteMedia(id: string) {
    try {
      await this.prisma.media.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') throw new NotFoundException('Wrong id');
    }
  }
}
