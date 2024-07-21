// Buttons
const addBook = document.getElementById("add") as HTMLButtonElement;
const applyFilter = document.getElementById(
  "ApplyFilters"
) as HTMLButtonElement;
const SortByTitle = document.getElementById("SortByTitle") as HTMLButtonElement;
const SortByPublicationDate = document.getElementById(
  "SortByPublicationDate"
) as HTMLButtonElement;
const SortByRating = document.getElementById(
  "SortByRating"
) as HTMLButtonElement;

// Inputs
const author = document.getElementById("Author") as HTMLInputElement;
const genre = document.getElementById("Genre") as HTMLInputElement;
const rating = document.getElementById("Rating") as HTMLInputElement;
console.log(rating)
// popup
const popup = document.querySelector(".popup") as HTMLDivElement;
const container = document.querySelector(".container") as HTMLDivElement;
const close_ = document.querySelector(".close") as HTMLSpanElement;

// books section
const booksSection = document.getElementById("books") as HTMLDivElement;

console.log(popup);
addBook.addEventListener("click", () => {
  popup.style.display = "flex";
});

close_.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

// add book data
const BookTitle = document.getElementById("BookTitle") as HTMLInputElement;
const BookAuthor = document.getElementById("BookAuthor") as HTMLInputElement;
const BookGenre = document.getElementById("BookGenre") as HTMLInputElement;
const pubdate = document.getElementById("pubdate") as HTMLInputElement;
const RatingWithAdd = document.getElementById("RatingWithAdd") as HTMLInputElement;
const save = document.getElementById("save") as HTMLButtonElement;

let editIndex: number | null = null; // Store the index of the book being edited

// Books
class Book {
  constructor(
    public title: string,
    public author: string,
    public genre: string,
    public date: Date,
    public rate: number
  ) {}
}
const Books: Book[] = [];

save.addEventListener("click", () => {
  const BookTitleValue: string = BookTitle.value.trim();
  const BookAuthorValue: string = BookAuthor.value.trim();
  const BookGenreValue: string = BookGenre.value.trim();
  const BookDateValue: Date = new Date(pubdate.value);
  const BookRateValue: number = parseFloat(RatingWithAdd.value);

  if (
    BookTitleValue &&
    BookAuthorValue &&
    BookGenreValue &&
    !isNaN(BookDateValue.getTime()) &&
    !isNaN(BookRateValue)
  ) {
    if (editIndex !== null) {
      // Update existing book
      Books[editIndex] = new Book(
        BookTitleValue,
        BookAuthorValue,
        BookGenreValue,
        BookDateValue,
        BookRateValue
      );
      console.log("Book updated:", Books[editIndex]);
      alert(`Book updated: ${Books[editIndex].title}`);
      editIndex = null; // Reset editIndex after updating
    } else {
      // Add new book
      const newBook = new Book(
        BookTitleValue,
        BookAuthorValue,
        BookGenreValue,
        BookDateValue,
        BookRateValue
      );
      Books.push(newBook);
      console.log("Book added:", newBook);
      alert(`Book added: ${newBook.title}`);
      BookTitle.value = "";
      BookAuthor.value = "";
      BookGenre.value = "";
      pubdate.value = "";
      RatingWithAdd.value = "";
    }
    popup.style.display = "none";
    displayBooks(Books);
  } else {
    console.error("Please fill in all fields correctly.");
    alert(`Please fill in all fields correctly.`);
  }
});
console.log(applyFilter);
applyFilter.addEventListener("click", () => {
  let data = [...Books];

  const authorValue: string = author.value.trim().toLowerCase();
  const genreValue: string= genre.value.trim().toLowerCase();
  const ratingValue: number = Number(rating.value.trim());
console.log(ratingValue)
  if (authorValue) {
    data = data.filter((book) => book.author.toLowerCase() === authorValue);
  }

  if (genreValue) {
    data = data.filter((book) => book.genre.toLowerCase() === genreValue);
  }

  if (ratingValue) {
    console.log(ratingValue);
    data = data.filter((book) => book.rate === Number(ratingValue));
  }
  displayBooks(data);
  console.log("Filtered Books:", data);
});

SortByTitle.addEventListener("click", () => {
  Books.sort((a, b) => a.title.localeCompare(b.title));
  console.log("Books sorted by title:", Books);
  displayBooks(Books);
});

SortByPublicationDate.addEventListener("click", () => {
  Books.sort((a, b) => a.date.getTime() - b.date.getTime());
  console.log("Books sorted by publication date:", Books);
  displayBooks(Books);
});

SortByRating.addEventListener("click", () => {
  Books.sort((a, b) => b.rate - a.rate);
  console.log("Books sorted by rating:", Books);
  displayBooks(Books);
});

let displayBooks = (data: Book[]) => {
  booksSection.innerHTML = "";
  data.forEach((book: Book, index: number) => {
    const formattedDate = book.date.toDateString();
    booksSection.innerHTML += `<div>
      <h3>${book.title}</h3>
      <p><span>Author: </span>${book.author}</p>
      <p><span>Genre: </span>${book.genre}</p>
      <p><span>Publication Date: </span>${formattedDate}</p>
      <p><span>Rating: </span>${book.rate}</p>
      <button onclick="editBook(${index})">Edit</button>
      <button onclick="deleteBook(${index})">Delete</button>
    </div>`;
  });
};

(window as any).editBook = (index: number) => {
  const book = Books[index];
  BookTitle.value = book.title;
  BookAuthor.value = book.author;
  BookGenre.value = book.genre;
  pubdate.value = book.date.toISOString().substr(0, 10);
  RatingWithAdd.value = book.rate.toString();
  popup.style.display = "flex";
  editIndex = index;
};

(window as any).deleteBook = (index: number) => {
  if (confirm("Are you sure you want to delete this book?")) {
    Books.splice(index, 1);
    displayBooks(Books);
  }
};
