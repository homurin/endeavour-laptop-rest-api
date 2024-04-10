import { Prisma } from "@prisma/client";
import * as Brand from "@repository/brandRepository";

export type BrandGetAll = Prisma.PromiseReturnType<typeof Brand.getAll>;

export interface BrandGetAllQuery {
  search?: string;
}
