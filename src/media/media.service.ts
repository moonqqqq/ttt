import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { MEDIA_TYPES } from './interfaces/media-enum.interface';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  // async createMedia() {
  //     await this.prisma.media.create({
  //         data: {
  //             image: "test",
  //             link: "test",
  //             publisher: "test",
  //             uploadedAt: new Date(),
  //             type: "news"
  //         }
  //     })
  // }

  async getMedia(type?: MEDIA_TYPES) {
    const where = type ? { type } : {};

    return await this.prisma.media.findMany({ where });
  }
}
