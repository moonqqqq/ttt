import { IPagination } from '../interfaces/pagination.interface';
import {
  IResWrapList,
  IResWrapSingle,
  ResWrapPagination,
} from '../interfaces/res-wrapper.interface';

export default class ResWrapper {
  static single<T>(obj: T): IResWrapSingle<T> {
    return {
      data: obj,
    };
  }

  static list<T>(obj: T[]): IResWrapList<T> {
    return {
      data: obj,
    };
  }

  static listWithPagination<T>(
    pagination: IPagination,
    list: T[],
  ): ResWrapPagination<T> {
    return {
      pagination,
      data: list,
    };
  }

  // static listWithInfiniteScroll<T>(
  //   infiniteScroll: IInfiniteScroll,
  //   list: T[],
  // ): ResWrapInfiniteScroll<T> {
  //   return {
  //     infiniteScroll,
  //     data: list,
  //   };
  // }
}
