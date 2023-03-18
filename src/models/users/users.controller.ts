import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signupUser(@Body() userBody: CreateUserDto) {
    const user = await this.usersService.createUser(userBody);

    return { message: 'User successfully signed up!', user };
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() userBody: LoginUserDto) {
    const { username, password } = userBody;

    const token = await this.usersService.login(username, password);

    return { message: 'User successfully logged in!', token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getLoggedInUser(@Req() req) {
    const { user } = req;

    return { message: 'User profile retrieved!', user };
  }
}
