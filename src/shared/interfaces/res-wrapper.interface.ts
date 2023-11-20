// import { IPagination } from './pagination.interface';

import { IPagination } from './pagination.interface';

export interface IResWrapSingle<Type> {
  data: Type;
}

export interface IResWrapList<Type> {
  data: Type[];
}

export interface ResWrapPagination<Type> {
  data: Type[];
  pagination: IPagination;
}

// export interface ResWrapInfiniteScroll<Type> {
//   data: Type[];
//   infiniteScroll: IInfiniteScroll;
// }
