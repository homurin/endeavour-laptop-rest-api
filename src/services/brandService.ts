import * as Brand from "@repository/brandRepository";
import { SendError } from "../utils/apiError";
import { BrandGetAllQuery } from "../types/brand";
import { Prisma } from "@prisma/client";

export async function getAll(query: BrandGetAllQuery) {
  try {
    let option: Prisma.BrandWhereInput = {};
    if (query.search) {
      option.name = { contains: query.search, mode: "insensitive" };
    }
    const data = await Brand.getAll(option);
    const totalCount = await Brand.count();

    if (!data) {
      throw new SendError("not found", 404);
    }

    return { data, dataCount: data.length, totalCount };
  } catch (err) {
    throw err;
  }
}
