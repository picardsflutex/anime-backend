import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { Tokens } from 'src/types/token.type';

@Injectable()
export class AuthService {
  userRepository: any;

  constructor(
    private userService:UsersService,
    private jwtService:JwtService
  ) {}
  
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
    const tokens = await this.getTokens(user)

    await this.updateRtHash(user.user_id, tokens.refresh_token)

    return tokens
  }

  async login(userDto: CreateUserDto) : Promise<Tokens> {
    const user = await this.validateUser(userDto)
    const tokens = await this.getTokens(user)
    await this.updateRtHash(user.user_id, tokens.refresh_token)
    return tokens
  }

  async logout() {

  }

  async refresh() {
    
  }

  async getTokens(user: User) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },{
        secret: process.env.PRIVATE_AT_SECRET,
        expiresIn: 60 * 15,
      }
      ),
      this.jwtService.signAsync({
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },{
        secret: process.env.PRIVATE_RT_SECRET,
        expiresIn: 60 * 60 * 24 * 14,
      }
      )]
    );

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

  async updateRtHash(user_id:number, rt:string){
    const hashedRT = await bcrypt.hash(rt, 5)
    const user = await this.userService.getUserById(user_id)
    user.hashed_refresh_token = hashedRT;
    await user.save();
  }
}
