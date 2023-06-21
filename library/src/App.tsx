import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { Library } from "./helpers/types";
import CardsContainer from "./components/CardsContainer";
import AddBookButton from "./components/AddBookButton";

// TODO: add redux store or zustand for practice

export default function App() {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <Header />
      <main className="main">
        <div className="add-book-container">
          <AddBookButton setOpen={setOpen} />
          <Modal
            open={open}
            setOpen={setOpen}
            library={library}
            setLibrary={setLibrary}
          />
        </div>
        <CardsContainer library={library} setLibrary={setLibrary} />
      </main>
      <Footer />
    </>
  );
}
