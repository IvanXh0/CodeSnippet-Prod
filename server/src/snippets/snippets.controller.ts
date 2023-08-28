import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateSnippetDto,
  ResponseSnippetDto,
  UpdateSnippetDto,
} from './dtos/snippet.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Snippets')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllSnippets(): Promise<ResponseSnippetDto[]> {
    return this.snippetsService.getAllSnippets();
  }

  @ApiResponse({
    status: 200,
    description: 'Get all snippets',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllSnippetsByUser(@GetUser() user: any): Promise<ResponseSnippetDto[]> {
    const userEmail = user.email;
    return this.snippetsService.getAllSnippetsByUser(userEmail);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  searchSnippets(
    @GetUser() user: any,
    @Query('query') query: string,
  ): Promise<ResponseSnippetDto[]> {
    const userEmail = user.email;
    return this.snippetsService.searchSnippets(userEmail, query);
  }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Successfully added new snippet',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard('jwt'))
  addNewSnippet(
    @Body() snippet: CreateSnippetDto,
    @GetUser() user: any,
  ): Promise<ResponseSnippetDto> {
    const userEmail = user.email;
    return this.snippetsService.addNewSnippet(snippet, userEmail);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getSnippetById(@Param('id') id: string): Promise<ResponseSnippetDto> {
    return this.snippetsService.getSnippetById(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted snippet',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
  })
  deleteSnippet(@Param('id') id: string): Promise<ResponseSnippetDto> {
    return this.snippetsService.deleteSnippet(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated snippet',
  })
  updateSnippet(
    @Param('id') id: string,
    @Body() updatedSnippet: UpdateSnippetDto,
  ): Promise<ResponseSnippetDto> {
    return this.snippetsService.updateSnippet(id, updatedSnippet);
  }
}
