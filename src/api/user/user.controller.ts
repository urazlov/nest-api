import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Get,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UserService } from './user.service';
import { UpdateNameDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.userService.updateName(body, req);
  }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }
}
