import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountService } from 'src/accounts/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
