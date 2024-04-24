import { UserRole } from "../users.model";

export class addRoleDto {
  readonly role: UserRole;
  readonly user_id: number;
}