import { Prisma } from "@prisma/client";
import * as Application from "@repository/applicationRepository";

export interface AppRequestBody {
  adminId: string;
  windId: string;
  name: string;
  headerImageId?: string;
  screenshotsId?: string;
  moviesId?: string;
  price?: number;
  description?: string;
  website?: string;
  link?: string;
  developers?: string;
  publishers?: string;
  headerImage?: string;
  screenshots?: string;
  movies?: string;
  windows: boolean;
  mac: boolean;
  linux: boolean;
  releaseDate: Date;
  minCpuSpeed: number;
  minCores: number;
  minDirectX: number;
  minOpenGl: number;
  minGpuMemory: number;
  minGpuBoostClock: number;
  minRam: number;
  minStorage: number;
  bitOs: number;
}

export interface AppGetAllQuery {
  search?: string;
  sort_by?: string;
  order_by?: Prisma.SortOrder;
  page?: string;
  size?: string;
}

enum OrderParams {
  ASC,
  DESC,
}

export type CreatedOneApp = Prisma.PromiseReturnType<
  typeof Application.createOne
>;
export type UpdatedOneApp = Prisma.PromiseReturnType<
  typeof Application.updateOne
>;
export type GetAllApp = Prisma.PromiseReturnType<typeof Application.getAll>;
