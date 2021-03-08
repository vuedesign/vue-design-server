import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appsModule from './apps/imports';
import { JwtAuthGuard } from './apps/auth/guards/jwt-auth.guard';
// import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './apps/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ...appsModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
