import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Request } from 'express';
import { EmailService } from 'src/config/email/email.service';

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
  @Get('customer')
  findCustomers() {
    return this.usersService.findAllCustomer();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Get('team/:projectId')
  getAccountsByProjectId(@Param('projectId') projectId: number) {
    return this.usersService.findByIdProduct(projectId);
  }
  @Post('top5')
  getTop5Staff() {
    return this.usersService.findTop5UserFormTask();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAccountDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @Patch('status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAccountDto,
  ) {
    return this.usersService.updateStatus(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('upload/:id')
  uploadFile(@Param('id') id: string, @UploadedFile() file) {
    console.log(file);
    // return this.usersService.uploadFile(+id, file);
  }
}
