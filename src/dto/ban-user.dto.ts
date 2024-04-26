import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class banUserDto {
  @ApiProperty({example: 123, description: 'E-mail', required: true})
  readonly user_id: number;
  @ApiProperty({example: 'Rasism.', description: 'Reason of ban.'})
  readonly badReason: string;
  @IsString()
  @Matches(/^(\d+mo)?(\s?)(\d+d)?(\s?)(\d+h)?(\s?)(\d+m)?(\s?)(\d+s)?|(permanent)$/i)
  @ApiProperty({example: '1m 10d', description: 'Time of ban.', required: true})
  readonly timeOfBan: string;
}