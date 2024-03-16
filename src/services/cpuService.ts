import { Prisma } from "@prisma/client";
import * as Cpu from "@repository/cpuRepository";
import { CpuGetAll, CpuGetAllQuery, CpuGetOne } from "../models/cpu";

export async function getAllCpu(query?: CpuGetAllQuery): Promise<{
  data: CpuGetAll;
  dataCount: number;
  totalCount: number;
}> {
  try {
    const fields: Prisma.CpuSelect = {
      id: true,
      name: true,
      baseSpeed: true,
      maxSpeed: true,
      cores: true,
      price: true,
      benchmark: true,
    };

    const cpuQuery: Prisma.CpuWhereInput = {};

    if (query?.name) {
      cpuQuery.name = {
        contains: query.name,
        mode: "insensitive",
      };
    }

    const data = await Cpu.getAll(fields, cpuQuery);
    const totalCount = await Cpu.count();

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    throw err;
  }
}

export async function getOneCpu(cpuId: string): Promise<CpuGetOne> {
  try {
    const fields: Prisma.CpuSelect = {
      id: true,
      name: true,
      price: true,
      baseSpeed: true,
      maxSpeed: true,
      cores: true,
      createdAt: true,
      updatedAt: true,
    };
    const data: CpuGetOne = await Cpu.getOne(cpuId, fields);
    return data;
  } catch (err) {
    throw err;
  }
}
