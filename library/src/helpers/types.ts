export type Book = {
  id: string;
  author: string;
  title: string;
  pages: number;
  read: boolean;
};

export type Library = Book[];

export type FormData = Omit<Book, "id">;

export type ErrorPath = "title" | "author" | "pages" | "read" | "exists";

export type Errors = {
  [key in ErrorPath]?: string;
};
