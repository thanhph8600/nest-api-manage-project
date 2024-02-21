import { Injectable, NestMiddleware } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  public static configure(options: MulterOptions): MulterModuleOptions {
    return {
      storage: multer.diskStorage(options),
    };
  }
  use(req: any, res: any, next: () => void) {
    next();
  }
}
