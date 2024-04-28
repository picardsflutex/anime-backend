import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import Mail from 'nodemailer/lib/mailer';

export class SendEmailDto {
  @ApiProperty({example: '[example1@example.com, example2@example.com]', description: 'E-mail to', required: true})
  @IsString({message: 'Email shoold be a string.'})
  readonly recipients: Mail.Address[];
  @ApiProperty({example: 'Activation account.', description: 'Subject of mail.', required: true})
  @IsString({message: 'Email shoold be a string.'})
  readonly subject: string;
  @ApiProperty({example: 'html file', description: 'html file', required: true})
  @IsString({message: 'Email shoold be a string.'})
  readonly html: string;
  @ApiProperty({example: 'This activation mail for webapp "Anime".', description: 'text mail'})
  @IsString({message: 'Email shoold be a string.'})
  readonly text?: string;
}