import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
}
