import { PaginationAndSortType } from 'src/types/util.types';

export type ProductQuery = PaginationAndSortType & { name?: string };
