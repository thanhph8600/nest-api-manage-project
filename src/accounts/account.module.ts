import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { UsersController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/config/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), AuthModule],
  controllers: [UsersController],
  providers: [AccountService, AuthService, JwtService, EmailService],
  exports: [AccountService],
})
export class UsersModule {}
