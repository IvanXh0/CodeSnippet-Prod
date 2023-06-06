import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SnippetsModule } from './snippets/snippets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SnippetsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
