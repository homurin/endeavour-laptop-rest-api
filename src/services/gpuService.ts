import { Prisma } from "@prisma/client";
import * as Gpu from "@repository/gpuRepository";
import { GpuGetAll, GpuGetAllQuery, GpuGetOne } from "../models/gpu";

export async function getAllGpu(query?: GpuGetAllQuery): Promise<{
  data: GpuGetAll;
  dataCount: number;
  totalCount: number;
}> {
  try {
    const fields: Prisma.GpuSelect = {
      id: true,
      name: true,
      maxSpeed: true,
      directX: true,
      openGl: true,
      price: true,
    };

    const gpuQuery: Prisma.GpuWhereInput = {};

    if (query?.name) {
      gpuQuery.name = {
        contains: query.name,
        mode: "insensitive",
      };
    }

    const data = await Gpu.getAll(fields, gpuQuery);
    const totalCount = await Gpu.count();

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    throw err;
  }
}

export async function getOneGpu(cpuId: string): Promise<GpuGetOne> {
  try {
    const fields: Prisma.GpuSelect = {
      id: true,
      name: true,
      price: true,
      maxSpeed: true,
      memory: true,
      directX: true,
      openGl: true,
      createdAt: true,
      updatedAt: true,
    };
    const data: GpuGetOne = await Gpu.getOne(cpuId, fields);
    return data;
  } catch (err) {
    throw err;
  }
}