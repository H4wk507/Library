"use strict";

(() => {
  class Book {
    constructor(author, title, pages, read) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = read;
    }

    changeReadStatus() {
      this.read = !this.read;
    }
  }

  class Library {
    constructor(books) {
      this.books = books;
    }

    addBook(author, title, pages, read) {
      if (!this.alreadyExist(title, author)) {
        this.books.push(new Book(author, title, pages, read));
      }
    }

    removeBook(idx) {
      this.books.splice(idx, 1);
    }

    alreadyExist(title, author) {
      return this.books.some((book) => {
        return book.title === title && book.author === author;
      });
    }

    size() {
      return this.books.length;
    }
  }

  function addBook() {
    /**
     * Get values from the input form and append a new book.
     */
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    // TODO: change this
    const errorDiv = document.querySelector(".error");

    if (
      title.length === 0 ||
      author.length === 0 ||
      pages.length === 0 ||
      parseInt(pages) <= 0
    ) {
      // Incorrect form values.
      return;
    } else if (myLibrary.alreadyExist(title, author)) {
      errorDiv.classList.add("show");
    } else {
      myLibrary.addBook(title, author, pages, read);
      const book = myLibrary.books[myLibrary.size() - 1];
      cardsContainer.appendChild(prepareCard(book, myLibrary.size() - 1));
      modalContainer.classList.remove("show");
      errorDiv.classList.remove("show");
      form.reset();
    }
  }

  function prepareCard(book, idx) {
    const card = document.createElement("div");
    card.classList.add("card");

    // card's title
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;
    card.appendChild(cardTitle);

    card.appendChild(document.createElement("hr"));

    // card's author
    const cardAuthor = document.createElement("div");
    cardAuthor.classList.add("card-author");
    cardAuthor.innerText = book.author;
    card.appendChild(cardAuthor);

    card.appendChild(document.createElement("hr"));

    // card's pages
    const cardPages = document.createElement("div");
    cardPages.classList.add("card-pages");
    cardPages.innerText = `${book.pages} pages`;
    card.appendChild(cardPages);

    const readButton = document.createElement("button");
    readButton.setAttribute("type", "button");
    readButton.innerText = book.read ? "Read" : "Not read";
    readButton.classList.add("card-read");
    readButton.classList.add(book.read ? "read" : "unread");
    readButton.addEventListener("click", () => {
      if (readButton.classList.contains("read")) {
        readButton.classList.remove("read");
        readButton.classList.add("unread");
        readButton.innerText = "Not read";
      } else {
        readButton.classList.remove("unread");
        readButton.classList.add("read");
        readButton.innerText = "Read";
      }
      book.changeReadStatus();
    });
    card.appendChild(readButton);

    // remove card button
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("card-remove");
    removeButton.setAttribute("data-book-index", `${idx}`);
    removeButton.addEventListener("click", removeBook);
    card.appendChild(removeButton);

    return card;
  }

  function prepareCards() {
    /**
     * Prepare the initial state of the cards.
     */
    myLibrary.addBook("George Orwell", "1984", 350, true);
    myLibrary.addBook("F. Scott Fitzgerald", "The Great Gatsby", 250, true);
    myLibrary.addBook("Bret Easton Ellis", "American Psycho", 400, true);
    myLibrary.addBook("Plato", "Republic", 206, false);

    myLibrary.books.forEach((book, idx) => {
      cardsContainer.appendChild(prepareCard(book, idx));
    });
  }

  function removeBook() {
    const idx = this.dataset.bookIndex;
    myLibrary.removeBook(idx);
    this.parentNode.remove();

    // When removing a book, shift the remaining indices to the left
    Array.from(removeButtons)
      .slice(idx)
      .forEach((removeButton) => {
        removeButton.dataset.bookIndex =
          parseInt(removeButton.dataset.bookIndex) - 1;
      });
  }

  const removeButtons = document.querySelectorAll(".card-remove");
  const form = document.querySelector(".form");
  const cardsContainer = document.querySelector(".cards-container");
  const addBookButton = document.querySelector(".add-book-btn");
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal");
  const submitButton = document.querySelector(".submit");

  submitButton.addEventListener("click", addBook);

  addBookButton.addEventListener("click", () => {
    modalContainer.classList.add("show");
  });

  document.addEventListener("click", (event) => {
    if (event.target === addBookButton || modal.contains(event.target)) {
      return;
    } else if (modalContainer.classList.contains("show")) {
      modalContainer.classList.remove("show");
    }
  });

  const myLibrary = new Library([]);
  prepareCards();
})();
