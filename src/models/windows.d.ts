import { Prisma } from "@prisma/client";
import * as Windows from "@repository/windowsRepository";

export type WindowsGetAll = Prisma.PromiseReturnType<typeof Windows.getAll>;
export type WindowsGetOne = Prisma.PromiseReturnType<typeof Windows.getOne>;

export interface WindowsGetAllQuery {
  name?: string;
}
