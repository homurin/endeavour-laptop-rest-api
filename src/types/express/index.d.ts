import { RequestGallery } from "../laptop";
import { AdminProfile } from "../admin";
export {};

declare global {
  namespace Express {
    export interface Request {
      galleries?: Array<RequestGallery>;
      user?: AdminProfile;
    }
  }
}
