import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronService {
  @Cron('*/10 * * * *')
  async runEveryTenMinutes() {
    try {
      const reponse = await axios.get(
        'https://codesnippet-prod.onrender.com/api/cron',
      );
      console.log(reponse.data);
    } catch (error) {
      console.error(error);
    }
  }
}
