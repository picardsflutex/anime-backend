import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { addRoleDto } from './dto/add-role.dto';
import { banUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Register User'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: 'Give Role for User'})
  @ApiResponse({status: 200})
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/role')
  setRole(@Body() dto: addRoleDto) {
    return this.usersService.setRole(dto);
  }

  @ApiOperation({summary: 'Give Role for User'})
  @ApiResponse({status: 200})
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/ban')
  ban(@Body() dto: banUserDto) {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status:200, type:[User]})
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }
}
