import { Prisma } from "@prisma/client";

export type RequestGallery = {
  id: string;
  image: string;
};

export type GetAllLaptop = Prisma.PromiseReturnType<typeof Laptop.getAll>;
export type GetOneLaptop = Prisma.PromiseReturnType<typeof Laptop.getOne>;
export type CreateOneLaptop = Prisma.PromiseReturnType<typeof Laptop.createOne>;
export type UpdateOneLaptop = Prisma.PromiseReturnType<typeof Laptop.updateOne>;
