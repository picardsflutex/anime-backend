import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'examplemail@example.com', description: 'E-mail', required: true})
  readonly email: string;
  
  @ApiProperty({example: 'examplepass123', description: 'Password', required: true})
  readonly password: string;
}