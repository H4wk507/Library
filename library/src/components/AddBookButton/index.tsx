import styles from "./style.module.scss";

interface AddBookButtonProps {
  setOpen: (open: boolean) => void;
}

export default function AddBookButton({ setOpen }: AddBookButtonProps) {
  return (
    <button onClick={() => setOpen(true)} className={styles["add-book-btn"]}>
      + Add book
    </button>
  );
}
