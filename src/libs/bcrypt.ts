import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds: number = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export async function encryptPassword(password: string): Promise<string> {
  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  } catch (err) {
    throw err;
  }
}

export function encryptPasswordSync(password: string): string {
  try {
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    return encryptedPassword;
  } catch (err) {
    throw err;
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isCorrect: boolean = await bcrypt.compare(password, hashedPassword);
    return isCorrect;
  } catch (err) {
    throw err;
  }
}
