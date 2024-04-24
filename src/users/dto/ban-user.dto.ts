import { IsString, Matches } from 'class-validator';

export class banUserDto {
  readonly user_id: number;
  readonly badReason: string;
  @IsString()
  @Matches(/^(\d+mo)?(\s?)(\d+d)?(\s?)(\d+h)?(\s?)(\d+m)?(\s?)(\d+s)?|(permanent)$/i)
  readonly timeOfBan: string;
}