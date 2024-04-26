import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/common/dto';
import { Tokens } from 'src/common/types';

@Injectable()
export class AuthService {

  constructor(
    private userService:UsersService,
    private jwtService:JwtService
  ) {}

  async signup(userDto: CreateUserDto) {

    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Current user is already exist.',
      HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password_hash, 5)
    const user = await this.userService.createUser(
      {...userDto, password_hash: hashPassword}
    )

    return await this.getTokens(user)
  }

  async signin(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return await this.getTokens(user)
  }

  async refresh(gettedUserId: number, hashed_refresh_token: string) {
    console.log(gettedUserId, hashed_refresh_token)
    const { user_id } = this.jwtService.verify(hashed_refresh_token,
      {secret: process.env.PRIVATE_RT_SECRET}) as { user_id: number }

    if(gettedUserId !== user_id)
      throw new UnauthorizedException({message: 'Invalid token or userId.'})

    const user = await this.userService.getUserById(user_id)

    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    
    return await this.getTokens(user)
  }

  async getTokens(user: User) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },{
        secret: process.env.PRIVATE_AT_SECRET,
        expiresIn: 60 * 30,
      }
      ),
      this.jwtService.signAsync({
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },{
        secret: process.env.PRIVATE_RT_SECRET,
        expiresIn: 60 * 60 * 24 * 30,
      }
      )]
    )

    return {
      access_token: at,
      refresh_token: rt,
    } as Tokens
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
}
