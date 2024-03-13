import { PrismaClient } from "@prisma/client";
import { encryptPasswordSync } from "../../src/libs/bcrypt";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const prisma = new PrismaClient();

interface Admin {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
}

const adminConfig = (): Admin => {
  const password: string = process.env.ADMIN_PASSWORD || "endeavours2024";
  const hashedPassword = encryptPasswordSync(password);

  return {
    id: uuid(),
    username: "endeavours",
    password: hashedPassword,
    fullName: "Endeavour Morse",
    email: "endeavours@endeavours.com",
  };
};

export const admin = adminConfig();

export const adminSeed = async (): Promise<void> => {
  try {
    await prisma.admin.create({ data: admin });
    console.info("admin seeding success");
  } catch (err) {
    console.error(err);
    throw new Error("admin seeding failed");
  }
};
