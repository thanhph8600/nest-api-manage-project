import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Request } from 'express';
import { EmailService } from 'src/config/email/email.service';
import { Public } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: AccountService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateAccountDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateAccountDto) {
    return this.usersService.login(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAccountDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Public()
  @Get('send')
  // async sendEmail(): Promise<string> {
  //   await this.emailService.sendEmail(
  //     'pht456654@gmail.com',
  //     'Test Subject',
  //     'Hello, this is a test email!',
  //   );
  //   return 'Email sent!';
  // }
  test() {
    console.log(123);
    return 123;
  }
}
