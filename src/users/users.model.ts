import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { AnimeTitle } from "src/anime/anime.model";
import { Comment } from "src/comment/comment.model";
import { UserRole } from "src/common/types";

interface UserCreationAttrs{
  email: string;
  password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>{

  @ApiProperty({example: 1, description: 'Unique identifier'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  user_id!: number;

  @ApiProperty({example: 'Evgenij', description: 'Username'})
  @Column({type: DataType.STRING, unique: true})
  username: string;

  @ApiProperty({example: 'apfasfafasasf.jpg', description: 'Image path'})
  @Column({type: DataType.STRING, unique: true})
  avatarImg: string;

  @ApiProperty({example: 'examplemail@example.com', description: 'E-mail', required: true})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email!: string;

  @ApiProperty({example: 'examplepass123', description: 'Password', required: true})
  @Column({type: DataType.STRING, allowNull: false})
  password_hash!: string;

  @ApiProperty({example: 'cae20cca-3778-494e-aa21-a9e7134fa798', description: 'Key for activate link.', required: true})
  @Column({type: DataType.STRING, allowNull: false})
  activateKey: string;

  @ApiProperty({example: 'false', description: 'Account is activated', required: true})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isActivated: boolean;

  @ApiProperty({example: 'user', description: 'Role', type: 'UserRole = admin | media_moderator | site_moderator | voice_team_leader | voice_team_moderator | user'})
  @Column({type: DataType.ENUM('admin', 'media_moderator', 'site_moderator', 'voice_team_leader', 'voice_team_moderator', 'user'), defaultValue:'user'})
  role: UserRole;

  @ApiProperty({example: '2024-04-22 21:18:42.513+03', description: 'Date of Create'})
  @Column({type: DataType.DATE, defaultValue: DataType.NOW})
  created_at: Date;

  @ApiProperty({example: 'active', description: 'Status of account', type: 'status = active | banned'})
  @Column({type: DataType.ENUM('active', 'banned'), defaultValue:'active'})
  status: 'active' | 'banned';

  @ApiProperty({example: 'Insults and inappropriate behavior in chat', description: 'Reason of ban'})
  @Column({type: DataType.STRING})
  badReason: string;

  @ApiProperty({example: '2024-04-22 21:18:42.513+03', description: 'Ban time'})
  @Column({type: DataType.DATE})
  banned_to: Date;

  @HasMany(() => AnimeTitle)
  titles: AnimeTitle[];

  @HasMany(() => Comment)
  comments: Comment[];
}