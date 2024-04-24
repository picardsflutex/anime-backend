import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService:UsersService,
    private jwtService:JwtService
  ) {}

  async generateToken(user: User) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(
      userDto.password_hash,
      user.password_hash
    )
    if(user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: 'Invalid input password or email.'})
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Current user is already exist.',
      HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password_hash, 5)
    const user = await this.userService.createUser(
      {...userDto, password_hash: hashPassword}
    )
    return this.generateToken(user)
  }

}
