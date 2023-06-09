import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SnippetsModule } from './snippets/snippets.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { CronController } from './cron/cron.controller';

@Module({
  imports: [
    SnippetsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [CronController],
  providers: [CronService],
})
export class AppModule {}
