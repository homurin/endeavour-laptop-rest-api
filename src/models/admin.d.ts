import { Prisma } from "@prisma/client";
import { getProfileById } from "@/src/repository/adminRepository";

type AdminProfile = Prisma.PromiseReturnType<typeof getProfileById>;
