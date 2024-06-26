import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { parseTimeOfBan } from './functions/parse-ban-time';
import { UserRole } from 'src/common/types';
import { CreateUserDto, addRoleDto, banUserDto } from 'src/common/dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User){}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  
  async setRole(dto: addRoleDto) {
    const user = await this.userRepository.findByPk(dto.user_id)
    if(user && this.isValidRole(dto.role)){
      user.role = dto.role;
      await user.save();
      return dto;
    }
    throw new HttpException(
      'User not found or Role not true.', HttpStatus.NOT_FOUND
    )
  }
  
  async banUser(dto: banUserDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    
    if (!user) {
      throw new HttpException(
        'User not found.', HttpStatus.NOT_FOUND
      )
    }
    
    user.status = 'banned';
    user.badReason = dto.badReason;
    
    const banExpiration = parseTimeOfBan(dto.timeOfBan);
    if (banExpiration !== null) {
      user.banned_to = banExpiration;
    } else {
      user.banned_to = new Date('3000-01-01 00:00:00.000+03');
    }
    
    await user.save();
    
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where:{email}, include: {all: true}})
    return user;
  }

  async getUserById(user_id: number) {
    const user = await this.userRepository.findByPk(user_id)
    return user;
  }

  async getUserByActivationKey(activateKey: string) {
    const user = await this.userRepository.findOne({where:{activateKey}, include: {all: true}})
    return user;
  }

  private isValidRole(role: string): boolean {
    const validRoles: UserRole[] = ['admin', 'media_moderator', 'site_moderator', 'voice_team_leader', 'voice_team_moderator', 'user'];
    return validRoles.includes(role as UserRole);
  }
}
