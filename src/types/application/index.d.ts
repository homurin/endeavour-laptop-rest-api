import { Prisma } from "@prisma/client";

export interface AppRequestBody extends Prisma.ApplicationUncheckedCreateInput {
  headerImage?: string;
  screenshots?: string;
  movies?: string;
  genresId?: string[];
  categoriesId?: string[];
  tagsId?: string[];
}
