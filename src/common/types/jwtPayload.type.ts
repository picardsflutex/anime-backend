import { UserRole } from "./user-role.type";

export type JwtPayload = {
  user_id: number;
  email: string;
  role: UserRole;
};