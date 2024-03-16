import { Prisma } from "@prisma/client";
import * as Windows from "@repository/windowsRepository";
import {
  WindowsGetAllQuery,
  WindowsGetAll,
  WindowsGetOne,
} from "@models/windows";

export async function getAllWindows(query?: WindowsGetAllQuery): Promise<{
  data: WindowsGetAll;
  dataCount: number;
  totalCount: number;
}> {
  try {
    const fields: Prisma.WindowsSelect = {
      id: true,
      name: true,
    };
    const windowsQuery: Prisma.WindowsWhereInput = {};

    if (query?.name) {
      windowsQuery.name = {
        contains: query.name,
        mode: "insensitive",
      };
    }

    const data = await Windows.getAll(fields, windowsQuery);
    const totalCount = await Windows.count();

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    throw err;
  }
}

export async function getOneWindows(cpuId: string): Promise<WindowsGetOne> {
  try {
    const fields: Prisma.WindowsSelect = {
      id: true,
      name: true,
      buildNumber: true,
      releaseDate: true,
      version: true,
      createdAt: true,
      updatedAt: true,
    };
    const data: WindowsGetOne = await Windows.getOne(cpuId, fields);
    return data;
  } catch (err) {
    throw err;
  }
}
