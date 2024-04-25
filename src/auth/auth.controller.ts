import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens } from 'src/types/token.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Login user.'})
  @ApiResponse({status: 200, description:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwiZW1haWwiOiJ0ZW1hc2RhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM5ODU3MTIsImV4cCI6MTcxMzk4NjMxMn0.Y8e63S_R9wbJE4DampyepcHpheCMAvIsyA8vHVltSic'})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) : Promise<Tokens> {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Registration new user.'})
  @ApiResponse({status: 200, description:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwiZW1haWwiOiJ0ZW1hc2RhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM5ODU3MTIsImV4cCI6MTcxMzk4NjMxMn0.Y8e63S_R9wbJE4DampyepcHpheCMAvIsyA8vHVltSic'})
  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto)
  }

  @ApiOperation({summary: 'Logout to delete refresh token.'})
  @ApiResponse({status: 200, description:'ToDo'})
  @Post('/logout')
  logout() {
    return this.authService.logout()
  }

  @ApiOperation({summary: 'Logout to delete refresh token.'})
  @ApiResponse({status: 200, description:'ToDo'})
  @Post('/refresh')
  refresh() {
    return this.authService.refresh()
  }
}
