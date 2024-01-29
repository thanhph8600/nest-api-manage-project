import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './constants';
import { Account } from 'src/accounts/entities/account.entity';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(user: Account) {
    const { id, email, role } = user;
    const payload = { id: id, email: email, role: role };
    return {
      access_token: await this.jwtService.signAsync(payload, jwtConstants),
    };
  }

  setAccessToken(res: Response, token: string): void {
    res.cookie('access_token', token, { httpOnly: true });
  }

  getAccessToken(req: Request): string {
    return req.cookies['access_token'];
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
