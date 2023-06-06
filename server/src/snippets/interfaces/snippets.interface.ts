export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
