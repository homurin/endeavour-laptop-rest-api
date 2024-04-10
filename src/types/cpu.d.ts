import { Prisma } from "@prisma/client";
import * as Cpu from "@repository/cpuRepository";

export type CpuGetAll = Prisma.PromiseReturnType<typeof Cpu.getAll>;
export type CpuGetOne = Prisma.PromiseReturnType<typeof Cpu.getOne>;

export interface CpuGetAllQuery {
  search?: string;
}
