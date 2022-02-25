import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePassDto } from './dto/update-like-user.dto';
import { UpdateLikeDto } from './dto/update-pass-user.dto';
import { UserService } from './user.service';

@ApiTags('Users Endpoints')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get Users List' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get Individual User' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Liked List' })
  @Post('/like')
  async updateLikedUser(@Body() updateLikeUserDto: UpdateLikeDto) {
    return await this.userService.updateLikeUser(updateLikeUserDto);
  }

  @ApiOperation({ summary: 'Update Passed List' })
  @Post('/pass')
  async updatePassedUser(@Body() updatePassUserDto: UpdatePassDto) {
    return await this.userService.updatePassUser(updatePassUserDto);
  }
}
