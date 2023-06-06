import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import {
  CreateSnippetDto,
  ResponseSnippetDto,
  UpdateSnippetDto,
} from "./dtos/snippet.dto";
import { Snippet } from "./interfaces/snippets.interface";

@Injectable()
export class SnippetsService {
  constructor(@Inject("SNIPPET_MODEL") private snippetModel: Model<Snippet>) {}

  async getAllSnippets(): Promise<ResponseSnippetDto[]> {
    return this.snippetModel.find();
  }

  async getAllSnippetsByUser(email: string): Promise<ResponseSnippetDto[]> {
    return this.snippetModel.find({ email }).sort({ updatedAt: -1 });
  }

  async addNewSnippet(
    snippet: CreateSnippetDto,
    userEmail: string,
  ): Promise<ResponseSnippetDto> {
    return this.snippetModel.create({
      ...snippet,
      email: userEmail,
    });
  }

  async getSnippetById(id: string): Promise<ResponseSnippetDto> {
    return this.snippetModel.findById(id);
  }

  async searchSnippets(
    email: string,
    query: string,
  ): Promise<ResponseSnippetDto[]> {
    return this.snippetModel.find({
      email,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } },
      ],
    }).sort({ updatedAt: -1 }).exec();
  }

  async deleteSnippet(id: string): Promise<ResponseSnippetDto> {
    return this.snippetModel.findByIdAndDelete(id);
  }

  async updateSnippet(
    id: string,
    updatedSnippet: UpdateSnippetDto,
  ): Promise<ResponseSnippetDto> {
    return this.snippetModel.findByIdAndUpdate(id, updatedSnippet, {
      new: true,
    });
  }
}
