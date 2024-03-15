import { AdminProfile } from "./admin";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: AdminProfile;
    }
  }
}
