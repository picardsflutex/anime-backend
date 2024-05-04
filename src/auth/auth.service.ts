import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import { UsersService } from 'src/users/users.service';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'src/users/users.model';
import { AuthUserDto, CreateUserDto } from 'src/common/dto';
import { Tokens } from 'src/common/types';

@Injectable()
export class AuthService {

  constructor(
    private userService:UsersService,
    private jwtService:JwtService,
    private mailService:MailerService
  ) {}

  async signup(candidateDto: AuthUserDto) {

    const candidate = await this.userService.getUserByEmail(candidateDto.email)
    if (candidate)
      throw new HttpException('Current user is already exist.',
      HttpStatus.BAD_REQUEST)

    const hashPassword = await bcrypt.hash(candidateDto.password, 5)
    const activateKey : string = uuid.v4()

    const user = await this.userService.createUser(
      {...candidateDto, password_hash: hashPassword, activateKey}
    )
    await this.mailService.sendActivationEmail(candidateDto.email, activateKey)
  }

  async signin(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto)
    return await this.getTokens(user)
  }

  async activate(activateKey : string) {
    const user = await this.userService.getUserByActivationKey(activateKey)
    if (!user)
      throw new HttpException('Incorrect activation key.',
      HttpStatus.BAD_REQUEST)
    user.isActivated = true;
    await user.save();
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
        expiresIn: process.env.LIFETIME_AT
      }
      ),
      this.jwtService.signAsync({
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },{
        secret: process.env.PRIVATE_RT_SECRET,
        expiresIn: process.env.LIFETIME_RT,
      }
      )]
    )

    return {
      access_token: at,
      refresh_token: rt,
    } as Tokens
  }
  
  async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    if(!user)
      throw new UnauthorizedException({message: 'Invalid input password or email.'})
    if(!user.isActivated)
      throw new HttpException('Confirm your email.',
      HttpStatus.BAD_REQUEST)
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password_hash
    )
    if(user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: 'Invalid input password or email.'})
  }
}
