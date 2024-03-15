import { Prisma } from "@prisma/client";

export interface CreateLaptopRequestBody
  extends Prisma.LaptopUncheckedCreateInput {}

export interface CreateAppRequestBody
  extends Prisma.ApplicationUncheckedCreateInput {
  headerImage?: string;
  screenshots?: string;
  movies?: string;
}

export interface UpdateAppRequestBody
  extends Prisma.ApplicationUncheckedUpdateInput {
  headerImage?: string;
  screenshots?: string;
  movies?: string;
}
