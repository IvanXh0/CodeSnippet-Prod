import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SnippetsController } from './snippets.controller';
import { snippetProviders } from './snippets.providers';
import { SnippetsService } from './snippets.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SnippetsController],
  providers: [...snippetProviders, SnippetsService],
})
export class SnippetsModule {}
