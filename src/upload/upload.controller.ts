import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Post(':id')
  @UseInterceptors(FileInterceptor('thumb'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
