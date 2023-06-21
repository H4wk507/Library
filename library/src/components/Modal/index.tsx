import { useState } from "react";
import { Library, FormData, Errors, ErrorPath } from "../../helpers/types";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { bookSchemaWrapper } from "../../validation/bookValidation";
import { ValidationError } from "yup";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  library: Library;
  setLibrary: (library: Library) => void;
}

// TODO: extract form to another component
export default function Modal({
  open,
  setOpen,
  library,
  setLibrary,
}: ModalProps) {
  const bookSchema = bookSchemaWrapper(library);
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (book: FormData) => {
    bookSchema
      .validate(book, { abortEarly: false })
      .then(() => {
        setLibrary([...library, { ...book, id: crypto.randomUUID() }]);
        reset();
        setErrors({});
        setOpen(false);
      })
      .catch((error: ValidationError) => {
        setErrors(
          error.inner.reduce((acc: Errors, curr: ValidationError) => {
            acc[curr.path as ErrorPath] = curr.message;
            return acc;
          }, {}),
        );
      });
  };

  return (
    <>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className={styles.backdrop}></div>
          <div className={styles["modal-container"]}>
            <div className={styles.modal}>
              <div className={styles["modal-header"]}>Add a new book</div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
              >
                <input
                  type="text"
                  className={styles.title}
                  placeholder="Title"
                  autoFocus
                  {...register("title")}
                />
                <p className={styles["form-error"]}>{errors.title}</p>
                <input
                  type="text"
                  className={styles.author}
                  placeholder="Author"
                  {...register("author")}
                />
                <p className={styles["form-error"]}>{errors.author}</p>
                <input
                  type="number"
                  className={styles.pages}
                  placeholder="Pages"
                  {...register("pages")}
                />
                <p className={styles["form-error"]}>{errors.pages}</p>
                <p className={styles["form-error"]}>{errors.exists}</p>
                <div className={styles["is-read"]}>
                  <label htmlFor="is-read">Read?</label>
                  <input
                    type="checkbox"
                    className={styles.read}
                    {...register("read")}
                  />
                </div>
                <button type="submit" className={styles.submit}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={styles.close}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
