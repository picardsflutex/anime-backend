import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AtGuard, RoleGuard } from 'src/guards';
import { addRoleDto, banUserDto } from 'src/dto';
import { Public, Roles } from 'src/decorators';


@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Give Role for User'})
  @ApiResponse({status: 200, type: addRoleDto})
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/role')
  setRole(@Body() dto: addRoleDto) {
    return this.usersService.setRole(dto);
  }

  @ApiOperation({summary: 'Give Role for User'})
  @ApiResponse({status: 200, type: User})
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/ban')
  ban(@Body() dto: banUserDto) {
    return this.usersService.banUser(dto);
  }
}
