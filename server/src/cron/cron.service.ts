import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('*/10 * * * *')
  runEveryTenMinutes() {
    console.log('running every 10 minutes');
  }
}
