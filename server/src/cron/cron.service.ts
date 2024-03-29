import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronService {
  @Cron('*/10 * * * *')
  async runEveryTenMinutes() {
    try {
      await axios.get('https://codesnippet-prod.onrender.com/api/snippets');
    } catch (error) {
      console.log(error.message);
    }
  }
}
