import { Library } from "../../helpers/types";
import Card from "../Card";
import styles from "./style.module.scss";

interface CardsContainerProps {
  library: Library;
  setLibrary: React.Dispatch<React.SetStateAction<Library>>;
}

export default function CardsContainer({
  library,
  setLibrary,
}: CardsContainerProps) {
  return (
    <div className={styles["cards-container"]}>
      {library.map((book, idx) => (
        <Card key={idx} book={book} setLibrary={setLibrary} />
      ))}
    </div>
  );
}
