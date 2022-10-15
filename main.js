(() => {
  class Book {
    constructor(author, title, pages, read) {
      return { author, title, pages, read };
    }
    changeReadStatus() {
      if (this.read === "yes") this.read = "no";
      else if (this.read === "no") this.read = "yes";
    }
  }

  function addBookToLibrary(author, title, pages, read) {
    myLibrary.push(new Book(author, title, pages, read));
  }

  /*
  function createForm() {
    const form = document.createElement("form");

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("id", "title");
    title.setAttribute("placeholder", "Title");

    const author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("id", "author");
    author.setAttribute("placeholder", "Author");

    const pages = document.createElement("input");
    pages.setAttribute("placeholder", "Number of pages");
    pages.setAttribute("id", "pages");
    pages.setAttribute("type", "number");

    const read = document.createElement("input");
    read.setAttribute("type", "text");
    read.setAttribute("id", "read");
    read.setAttribute("placeholder", "read? yes or no");
    read.setAttribute("pattern", "^(yes|no)$");

    const addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    addButton.innerText = "ADD";
    addButton.addEventListener("click", addBook);

    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(pages);
    form.appendChild(read);
    form.appendChild(addButton);

    button.parentNode.insertBefore(form, button.nextSibling);
    this.disabled = true;
  }
  */

  function addBook() {
    /**
     * Get values from the input form and append a new book.
     */
    const cardsContainer = document.querySelector(".card-container");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(title, author, pages, read);
    const book = myLibrary[myLibrary.length - 1];
    cardsContainer.appendChild(prepareCard(book, myLibrary.length - 1));
  }

  function prepareCard(book, idx) {
    const card = document.createElement("div");
    card.classList.add("card");

    // card's title
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;
    card.appendChild(cardTitle);

    // card's author
    const cardAuthor = document.createElement("div");
    cardAuthor.classList.add("card-author");
    cardAuthor.innerText = book.author;
    card.appendChild(cardAuthor);

    // card's pages
    const cardPages = document.createElement("div");
    cardPages.classList.add("card-pages");
    cardPages.innerText = `${book.pages} pages`;
    card.appendChild(cardPages);

    const readButton = document.createElement("button");
    readButton.setAttribute("type", "button");
    readButton.innerText = book.read === "yes" ? "Read" : "Not read";
    readButton.classList.add("card-read");
    readButton.classList.add(book.read === "yes" ? "read" : "unread");
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
    addBookToLibrary("George Orwell", "1984", 350, "yes");
    addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", 250, "yes");
    addBookToLibrary("Bret Easton Ellis", "American Psycho", 400, "yes");
    addBookToLibrary("Plato", "Republic", 206, "no");

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    main.appendChild(cardsContainer);

    for (let i = 0; i < myLibrary.length; i++) {
      cardsContainer.appendChild(prepareCard(myLibrary[i], i));
    }
  }

  function removeBook() {
    const idx = this.dataset.bookIndex;
    myLibrary.splice(idx, 1);

    this.parentNode.remove();
    // Update book-index attribute when removing.
    const removeButtons = document.querySelectorAll(".remove");
    for (let i = idx; i < myLibrary.length; i++) {
      removeButtons[i].dataset.bookIndex =
        parseInt(removeButtons[i].dataset.bookIndex) - 1;
    }
  }

  const button = document.querySelector(".new-book-btn");
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal");
  const main = document.getElementsByTagName("main")[0];

  button.addEventListener("click", () => {
    modalContainer.classList.add("show");
  });

  document.addEventListener("click", (event) => {
    if (event.target === button || modal.contains(event.target)) {
      return;
    } else if (modalContainer.classList.contains("show")) {
      modalContainer.classList.remove("show");
    }
  });

  let myLibrary = [];
  prepareCards();
})();
