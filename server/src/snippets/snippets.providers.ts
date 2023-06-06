import { Connection } from "mongoose";
import { SnippetSchema } from "./snippets.schema";


export const snippetProviders = [
  {
    provide: 'SNIPPET_MODEL',
    useFactory: (connection: Connection) => connection.model('Snippet', SnippetSchema),
    inject: ['DATABASE_CONNECTION'],
  }
]
