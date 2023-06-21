import { Library } from "./types";

type BookLike = { title: string; author: string };

export const booksEquals = <T extends BookLike>(b1: T, b2: T) => {
  return b1.title === b2.title && b1.author === b2.author;
};

export const alreadyExists = <T extends BookLike>(
  library: Library,
  book: T,
): boolean => library.some((b) => booksEquals(b, book as BookLike));
