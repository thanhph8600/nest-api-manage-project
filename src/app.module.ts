import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './accounts/account.module';
import { Account } from './accounts/entities/account.entity';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { TeamModule } from './team/team.module';
import { Team } from './team/entities/team.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { EmailService } from './config/email/email.service';
import { EmailModule } from './config/email/email.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterMiddleware } from './middleware/multer/multer.middleware';
import { UploadController } from './upload/upload.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project_management',
      entities: [Account, Project, Team, Task],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    TeamModule,
    TaskModule,
    EmailModule,
    MulterModule.register(
      MulterMiddleware.configure({
        dest: './uploads', // Thư mục lưu trữ file
      }),
    ),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, EmailService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware)
      .forRoutes({ path: 'upload/:id', method: RequestMethod.POST }); // Đặt đường dẫn và phương thức HTTP mà bạn muốn xử lý file ảnh
  }
}
