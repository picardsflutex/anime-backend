import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/common/types/user-role.type";


export class addRoleDto {
  @ApiProperty({example: 123, description: 'E-mail', required: true})
  readonly user_id: number;
  @ApiProperty({example: 'admin', description: 'Desired role to set.'})
  readonly role: UserRole;
}