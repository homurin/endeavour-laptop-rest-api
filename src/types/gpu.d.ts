import { Prisma } from "@prisma/client";
import * as Gpu from "@repository/gpuRepository";

export type GpuGetAll = Prisma.PromiseReturnType<typeof Gpu.getAll>;
export type GpuGetOne = Prisma.PromiseReturnType<typeof Gpu.getOne>;

export interface GpuGetAllQuery {
  name?: string;
}
