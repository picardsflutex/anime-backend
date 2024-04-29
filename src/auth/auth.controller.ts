import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Redirect, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/common/dto';
import { AuthService } from './auth.service';
import { Tokens } from 'src/common/types';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Login user.'})
  @ApiResponse({status: 200, description:'Refresh and access tokens.'})
  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: AuthUserDto) : Promise<Tokens> {
    return this.authService.signin(userDto)
  }

  @ApiOperation({summary: 'Registration new user.'})
  @ApiResponse({status: 200, description:'Refresh and access tokens.'})
  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  register(@Body() userDto: AuthUserDto) : Promise<Tokens>  {
    return this.authService.signup(userDto)
  }

  @ApiOperation({summary: 'Activate account.'})
  @ApiResponse({status: 200, description:'Redirect to login page'})
  @Public()
  @Get('/activate/:key')
  @HttpCode(HttpStatus.OK)
  @Redirect('/')
  activate(@Param('key') activationKey: string) {
    this.authService.activate(activationKey)
    return { url: process.env.CLIENT_URL + '/login' };
  }

  @ApiOperation({summary: 'Logout to delete refresh token.'})
  @ApiResponse({status: 200, description:'Refresh and access tokens.'})
  @Public()
  @UseGuards(RtGuard)
  @Get('/refresh') 
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') hashed_refresh_token: string,
  ) : Promise<Tokens> {
    return this.authService.refresh(userId, hashed_refresh_token)
  }
}
