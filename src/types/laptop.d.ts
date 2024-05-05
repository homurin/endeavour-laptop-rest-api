import { Prisma } from "@prisma/client";
import * as Laptop from "@repository/laptopRepository";

export interface LaptopRequestBody {
  adminId: string;
  cpuId?: string;
  gpuId?: string;
  winId?: string;
  thumbId?: string;
  videosId?: string;
  brandId?: string;
  name: string;
  ram: number;
  ssdStorage: number;
  hddStorage: number;
  price: number;
  displayName?: string;
  displaySize?: number;
  displayResolution?: string;
  panelType?: string;
  panelCode?: number;
  refreshRate?: number;
  weight?: number;
  isNew?: boolean;
  odEdition?: string;
  thumb?: string;
  videos?: string;
  osEdition?: string;
  galleries?: GalleriesRequestBody[];
  removeThumbId?: string;
  removeVideosId?: string;
  removeGalleryIds?: string[];
}

type GalleriesRequestBody = {
  id: string;
  image: string;
};

export interface LaptopGetAllQuery {
  search?: string;
  sort_by?: string;
  order_by?: Prisma.SortOrder;
  page?: string;
  size?: string;
}

export type GetAllLaptop = Prisma.PromiseReturnType<typeof Laptop.getAll>;
export type GetOneLaptop = Prisma.PromiseReturnType<typeof Laptop.getOne>;
export type CreateOneLaptop = Prisma.PromiseReturnType<typeof Laptop.createOne>;
export type UpdateOneLaptop = Prisma.PromiseReturnType<typeof Laptop.updateOne>;
