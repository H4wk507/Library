import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import githubLogo from "./assets/github.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// TODO: add redux store for practice
type Book = {
  id: string;
  author: string;
  title: string;
  pages: number;
  read: boolean;
};

type Library = Book[];

const booksEquals = <T extends { title: string; author: string }>(
  b1: T,
  b2: T,
) => {
  return b1.title === b2.title && b1.author === b2.author;
};

const alreadyExists = <T extends { title: string; author: string }>(
  library: Library,
  book: T,
): boolean =>
  library.some((b) =>
    booksEquals(b, book as { title: string; author: string }),
  );

function Card({
  book,
  setLibrary,
}: {
  book: Book;
  setLibrary: Dispatch<SetStateAction<Library>>;
}) {
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
    <div className="card">
      <div className="card-title">{title}</div>
      <hr />
      <div className="card-author">{author}</div>
      <hr />
      <div className="card-pages">{pages} pages</div>
      <button
        onClick={() => changeReadStatus()}
        className={`card-read ${read ? "read" : "unread"}`}
      >
        {read ? "Read" : "Not read"}
      </button>
      <button onClick={removeBook} className="card-remove">
        Remove
      </button>
    </div>
  );
}

const schemaWrapper = (library: Library) => {
  const schema = yup
    .object({
      title: yup.string().required(),
      author: yup.string().required(),
      pages: yup
        .number()
        .typeError("pages must be a number")
        .positive("pages must be a positive number")
        .integer("pages must be an integer")
        .required(),
      read: yup.boolean().required(),
    })
    .test({
      test: (value, ctx) => {
        return alreadyExists(library, value)
          ? ctx.createError({ path: "form", message: "Book already exists" })
          : true;
      },
    });
  return schema;
};

// type FormData = yup.InferType<typeof schema>;
type FormData = Omit<Book, "id">;

export default function App() {
  const [library, setLibrary] = useState<Library>([
    {
      id: crypto.randomUUID(),
      title: "1984",
      author: "George Orwell",
      pages: 328,
      read: true,
    },
    {
      id: crypto.randomUUID(),
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 180,
      read: false,
    },
    {
      id: crypto.randomUUID(),
      title: "American Psycho",
      author: "Bret Easton Ellis",
      pages: 399,
      read: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Republic",
      author: "Plato",
      pages: 514,
      read: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const schema = schemaWrapper(library);
  const { register, handleSubmit } = useForm<FormData>();

  type Path = "title" | "author" | "pages" | "read" | "form";
  type Errors = {
    [key in Path]?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (data: FormData) => {
    schema
      .validate(data, { abortEarly: false })
      .then(() =>
        setLibrary([...library, { ...data, id: crypto.randomUUID() }]),
      )
      .catch((error: yup.ValidationError) => {
        setErrors(
          error.inner.reduce((acc: Errors, curr: yup.ValidationError) => {
            if (curr.path !== undefined) {
              acc[curr.path as Path] = curr.message;
            }
            return acc;
          }, {}),
        );
      });
  };

  return (
    <>
      <header>
        <h1>My Library</h1>
      </header>
      <main className="main">
        <div className="add-book-container">
          <button
            onClick={() => setShowModal(!showModal)}
            className="add-book-btn"
          >
            + Add book
          </button>
          <div className={`modal-container ${showModal && "show"}`}>
            <div className="modal">
              <div className="modal-header">Add a new book</div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
                noValidate
              >
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  {...register("title")}
                />
                <p className="form-error">{errors.title}</p>
                <input
                  type="text"
                  id="author"
                  placeholder="Author"
                  {...register("author")}
                />
                <p className="form-error">{errors.author}</p>
                <input
                  type="number"
                  id="pages"
                  placeholder="Pages"
                  {...register("pages")}
                />
                <p className="form-error">{errors.pages}</p>
                <p>{errors.form}</p>
                <div className="is-read">
                  <label htmlFor="is-read">Read?</label>
                  <input type="checkbox" id="read" {...register("read")} />
                </div>
                <button type="submit" className="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="cards-container">
          {library.map((book, idx) => (
            <Card key={idx} book={book} setLibrary={setLibrary} />
          ))}
        </div>
      </main>
      <footer className="footer">
        <img src={githubLogo} className="github-logo" alt="github-logo" />
        <a
          href="https://www.github.com/H4wk507/library"
          target="_blank"
          className="github-link"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}
