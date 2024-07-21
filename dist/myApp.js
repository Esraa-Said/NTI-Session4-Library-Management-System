"use strict";
// Buttons
const addBook = document.getElementById("add");
const applyFilter = document.getElementById("ApplyFilters");
const SortByTitle = document.getElementById("SortByTitle");
const SortByPublicationDate = document.getElementById("SortByPublicationDate");
const SortByRating = document.getElementById("SortByRating");
// Inputs
const author = document.getElementById("Author");
const genre = document.getElementById("Genre");
const rating = document.getElementById("Rating");
// popup
const popup = document.querySelector(".popup");
const container = document.querySelector(".container");
const close_ = document.querySelector(".close");
// books section
const booksSection = document.getElementById("books");
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
const BookTitle = document.getElementById("BookTitle");
const BookAuthor = document.getElementById("BookAuthor");
const BookGenre = document.getElementById("BookGenre");
const pubdate = document.getElementById("pubdate");
const RatingWithAdd = document.getElementById("Rating");
const save = document.getElementById("save");
let editIndex = null; // Store the index of the book being edited
// Books
class Book {
    constructor(title, author, genre, date, rate) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.date = date;
        this.rate = rate;
    }
}
const Books = [];
save.addEventListener("click", () => {
    const BookTitleValue = BookTitle.value.trim();
    const BookAuthorValue = BookAuthor.value.trim();
    const BookGenreValue = BookGenre.value.trim();
    const BookDateValue = new Date(pubdate.value);
    const BookRateValue = parseFloat(RatingWithAdd.value);
    if (BookTitleValue &&
        BookAuthorValue &&
        BookGenreValue &&
        !isNaN(BookDateValue.getTime()) &&
        !isNaN(BookRateValue)) {
        if (editIndex !== null) {
            // Update existing book
            Books[editIndex] = new Book(BookTitleValue, BookAuthorValue, BookGenreValue, BookDateValue, BookRateValue);
            console.log("Book updated:", Books[editIndex]);
            alert(`Book updated: ${Books[editIndex].title}`);
            editIndex = null; // Reset editIndex after updating
        }
        else {
            // Add new book
            const newBook = new Book(BookTitleValue, BookAuthorValue, BookGenreValue, BookDateValue, BookRateValue);
            Books.push(newBook);
            console.log("Book added:", newBook);
            alert(`Book added: ${newBook.title}`);
        }
        popup.style.display = "none";
        displayBooks(Books);
    }
    else {
        console.error("Please fill in all fields correctly.");
        alert(`Please fill in all fields correctly.`);
    }
});
console.log(applyFilter);
applyFilter.addEventListener("click", () => {
    let data = [...Books];
    const authorValue = author.value.trim().toLowerCase();
    const genreValue = genre.value.trim().toLowerCase();
    const ratingValue = rating.value.trim();
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
let displayBooks = (data) => {
    booksSection.innerHTML = "";
    data.forEach((book, index) => {
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
window.editBook = (index) => {
    const book = Books[index];
    BookTitle.value = book.title;
    BookAuthor.value = book.author;
    BookGenre.value = book.genre;
    pubdate.value = book.date.toISOString().substr(0, 10);
    RatingWithAdd.value = book.rate.toString();
    popup.style.display = "flex";
    editIndex = index;
};
window.deleteBook = (index) => {
    if (confirm("Are you sure you want to delete this book?")) {
        Books.splice(index, 1);
        displayBooks(Books);
    }
};
