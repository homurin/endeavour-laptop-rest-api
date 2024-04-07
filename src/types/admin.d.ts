import { Prisma } from "@prisma/client";
import { getProfileById } from "@/src/repository/adminRepository";

type AdminProfile = Prisma.PromiseReturnType<typeof getProfileById>;

export interface Admin {
  id: string;
  username: string;
  fullName?: string;
  email?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
