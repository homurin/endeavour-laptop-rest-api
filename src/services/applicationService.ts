import { v4 as uuid } from "uuid";
import { Prisma } from "@prisma/client";
import * as Application from "@repository/applicationRepository";
import { SendError } from "../utils/apiError";
import {
  CreateAppRequestBody,
  UpdateAppRequestBody,
} from "../models/application";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type CreatedOneApp = Prisma.PromiseReturnType<typeof Application.createOne>;
type UpdatedOneApp = Prisma.PromiseReturnType<typeof Application.updateOne>;

export async function getAllApp() {
  try {
    const data = await Application.getAll();
    return data;
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}

export async function getOneMediaAttributesApp(appId: string) {
  try {
    const data = await Application.getOneMediaAttributes(appId);
    if (!data) {
      throw new SendError("application not found", 404);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOneApp(id: string) {
  const data = await Application.getOne(id);
  if (!data) {
    throw new SendError("application not found", 404);
  }
  return data;
}

export async function isExists(id: string) {
  const data = await Application.getOne(id);
  if (!data) {
    return false;
  }
  return true;
}

export async function createOneApp(
  app: CreateAppRequestBody
): Promise<CreatedOneApp> {
  try {
    const appId = uuid();

    const data: Prisma.ApplicationUncheckedCreateInput = {
      ...app,
      id: appId,
      price: Number(app?.price) || 0,
      windows: JSON.parse(String(app.windows)),
      linux: JSON.parse(String(app.linux)),
      mac: JSON.parse(String(app.mac)),
      minCpuSpeed: Number(app.minCpuSpeed),
      minCores: Number(app.minCores),
      minGpuBoostClock: Number(app.minGpuBoostClock),
      minGpuMemory: Number(app.minGpuMemory),
      minDirectX: Number(app.minDirectX),
      minOpenGl: Number(app.minOpenGl),
      minRam: Number(app.minRam),
      minStorage: Number(app.minStorage),
      bitOs: Number(app.bitOs),
    };

    const createdApp: CreatedOneApp = await Application.createOne(data);

    if (!createdApp) {
      throw new SendError("failed create application", 500);
    }
    return createdApp;
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}
export async function updateOneApp(
  appId: string,
  app: UpdateAppRequestBody
): Promise<UpdatedOneApp> {
  try {
    const data: Prisma.ApplicationUncheckedUpdateInput = {
      ...app,
      price: Number(app?.price) || 0,
      windows: JSON.parse(String(app.windows)),
      linux: JSON.parse(String(app.linux)),
      mac: JSON.parse(String(app.mac)),
      minCpuSpeed: Number(app.minCpuSpeed),
      minCores: Number(app.minCores),
      minGpuBoostClock: Number(app.minGpuBoostClock),
      minGpuMemory: Number(app.minGpuMemory),
      minDirectX: Number(app.minDirectX),
      minOpenGl: Number(app.minOpenGl),
      minRam: Number(app.minRam),
      minStorage: Number(app.minStorage),
      bitOs: Number(app.bitOs),
    };

    const updatedApp: UpdatedOneApp = await Application.updateOne(appId, data);

    return updatedApp;
  } catch (err) {
    const error = err as Error;
    if (error instanceof PrismaClientKnownRequestError) {
      throw new SendError(`${error.message}`, 400);
    }
    throw new SendError(error.message, 500);
  }
}

export async function deleteOneApp(appId: string): Promise<void> {
  try {
    await Application.deleteOne(appId);
  } catch (err) {
    throw err;
  }
}
