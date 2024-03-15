import * as Admin from "@repository/adminRepository";
import { AdminProfile } from "@models/admin";
import { comparePassword } from "@libs/bcrypt";
import * as jwt from "@libs/jwt";
import { SendError } from "../utils/apiError";

export async function isAdminExists(adminId: string): Promise<boolean> {
  try {
    const isExists: boolean = await Admin.isAdminExists(adminId);
    return isExists;
  } catch (err) {
    throw err;
  }
}
export async function generateToken(
  username: string,
  password: string
): Promise<{ token: string; user: AdminProfile }> {
  try {
    const user = await Admin.getAuthProfileByUsername(username);
    if (!user) {
      throw new SendError("user not found", 404);
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new SendError("invalid username or password", 404);
    }

    const userProfile = await Admin.getProfileById(user.id);
    const userStringyfy = JSON.stringify(user);
    const token = await jwt.createToken(userStringyfy);

    return {
      user: userProfile,
      token,
    };
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}
