import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
    next();
  }
}
