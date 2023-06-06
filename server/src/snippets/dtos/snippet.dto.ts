import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Snippet } from '../interfaces/snippets.interface';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Title of the snippet',
    example: 'My javascript snippet',
  })
  title: string;

@ApiProperty({
    type: "string",
    format: "binary",
    required: true,
    description: "Code of the snippet",
    example: `async addNewSnippet(
  snippet: CreateSnippetDto,
  userEmail: string,
): Promise<ResponseSnippetDto> {
  const { code, ...otherFields } = snippet;
  const codeAsString = code.toString();

  const createdSnippet = await this.snippetModel.create({
    ...otherFields,
    code: codeAsString,
    email: userEmail,
  });

  return {
    ...createdSnippet.toJSON(),
    code: codeAsString,
  };
}`,
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Language of the snippet',
    example: 'javascript',
  })
  language: string;

  email: string;
}

export class ResponseSnippetDto extends CreateSnippetDto implements Snippet {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the snippet',
    example: '64416a1d723b65ab35909e1d',
  })
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UpdateSnippetDto extends CreateSnippetDto {}
