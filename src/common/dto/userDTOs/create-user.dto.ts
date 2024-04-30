import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: 'examplemail@example.com', description: 'E-mail', required: true})
  @IsString({message: 'Email shoold be a string.'})
  @IsEmail({}, {message: 'This is not email.'})
  readonly email: string;
  
  @ApiProperty({example: 'examplepass123', description: 'Password', required: true})
  @IsString({message: 'Password shoold be a string.'})
  @Length(4, 20, {message: 'Password shoold be a string.'})
  readonly password_hash: string;

  @ApiProperty({example: 'cae20cca-3778-494e-aa21-a9e7134fa798', description: 'uuid', required: true})
  @IsString({message: 'The uuid shoold be a string.'})
  readonly activateKey: string;
}