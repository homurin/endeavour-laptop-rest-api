import * as AdminRepository from "@repository/adminRepository";
import { Admin, AdminProfile } from "@/src/types/admin";
import { comparePassword, encryptPassword } from "@libs/bcrypt";
import * as jwt from "@libs/jwt";
import { SendError } from "../utils/apiError";
import { Prisma } from "@prisma/client";

export async function isAdminExists(adminId: string): Promise<boolean> {
  try {
    const isExists: boolean = await AdminRepository.isAdminExists(adminId);
    return isExists;
  } catch (err) {
    throw err;
  }
}

export async function update(id: string, data: Admin) {
  try {
    const newData: Prisma.AdminUpdateInput = {
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      updatedAt: new Date(),
    };

    if (data.password) {
      const hashedPassword = await encryptPassword(data.password);
      newData.password = hashedPassword;
    }

    const updatedData = await AdminRepository.updateProfile(id, newData);
    const userStringyfy = JSON.stringify({
      id: updatedData.id,
      fullName: updatedData.fullName,
      username: updatedData.username,
      email: updatedData.email,
    });
    const token = await jwt.createToken(userStringyfy);
    return { data: updatedData, token };
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}

export async function generateToken(
  username: string,
  password: string
): Promise<{ token: string; user: AdminProfile }> {
  try {
    const user = await AdminRepository.getAuthProfileByUsername(username);

    if (!user) {
      throw new SendError("user not found", 404);
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new SendError("invalid username or password", 404);
    }

    const userProfile = await AdminRepository.getProfileById(user.id);
    if (!userProfile) {
      throw new SendError("user not found", 404);
    }

    const userStringyfy = JSON.stringify({
      id: userProfile.id,
      fullName: userProfile.fullName,
      username: userProfile.username,
      email: userProfile.email,
    });
    const token = await jwt.createToken(userStringyfy);

    return {
      user: userProfile,
      token,
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof SendError) {
      throw new SendError(error.message, error.statusCode);
    }
    throw new SendError(error.message, 500);
  }
}
