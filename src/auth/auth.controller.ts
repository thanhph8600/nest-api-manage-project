import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AccountService } from 'src/accounts/account.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: AccountService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() createUserDto: CreateAccountDto) {
    return this.usersService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
