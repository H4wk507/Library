import { Dispatch, SetStateAction } from "react";
import { Book, Library } from "../../helpers/types";
import { booksEquals } from "../../helpers/utils";
import styles from "./style.module.scss";

interface CardProps {
  book: Book;
  setLibrary: Dispatch<SetStateAction<Library>>;
}

export default function Card({ book, setLibrary }: CardProps) {
  const changeReadStatus = (): void =>
    setLibrary((prev) =>
      prev.map((b) =>
        booksEquals(b, book) ? { ...book, read: !book.read } : b,
      ),
    );

  const removeBook = (): void =>
    setLibrary((prev) => prev.filter((b) => b.id !== id));

  const { id, title, author, pages, read } = book;

  return (
    <div className={styles.card}>
      <div className={styles["card-title"]}>{title}</div>
      <hr />
      <div className={styles["card-author"]}>{author}</div>
      <hr />
      <div className={styles["card-pages"]}>{pages} pages</div>
      <button
        onClick={() => changeReadStatus()}
        className={`${styles["card-read"]} ${
          read ? styles.read : styles.unread
        }`}
      >
        {read ? "Read" : "Not read"}
      </button>
      <button onClick={removeBook} className={styles["card-remove"]}>
        Remove
      </button>
    </div>
  );
}
