'use strict'
const BOOKS_KEY = 'books';
var gBook;
var gNextId = 1;
var gId;
var gFilterBy = 'PRICE';


createBooks();

function addBook(bookName, price, imgUrl) {
    var lastId = gBook[gBook.length - 1].id;
    if (bookName !== '' && price !== 0 && imgUrl !== '') {
        gBook.push(createBook(bookName, price, imgUrl));
        gBook[gBook.length - 1].id = ++lastId;
        saveBooksToStorage();

    }
}

function changeRate(bookId, rate) {
    var book = gBook.find(function (book) {
        return book.id === bookId
    })
    if (!book) return;
    book.rate = +rate;
    saveBooksToStorage();
}


function updateBook(bookId, bookPrice) {
    var book = gBook.find(function (book) {
        return book.id === bookId
    })
    if (!book) return;
    book.price = bookPrice;
    saveBooksToStorage();
}

function deleteBook(bookId) {
    var bookId = gBook.findIndex(function (book) { return book.id === bookId })
    if (bookId === -1) return;
    gBook.splice(bookId, 1);
    saveBooksToStorage();
}

function getBookDetails(bookId) {
    var book = gBook.find(function (book) {
        return book.id === bookId
    })
    return book;
}


function createBooks() {

    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        books = [createBook('Puki And Muki', 10, "img/book.jpg"
        ), createBook('Tell me again', 100, "img/book.jpg"
        ), createBook('What a book', 200, "img/book.jpg"
        )];
    }
    gBook = books;
    saveBooksToStorage();
}



function createBook(name, price, imgUrl) {
    return {
        id: gNextId++,
        name: name,
        price: price,
        rate: 0,
        imgUrl: imgUrl,
    }
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function sortByName() {
    gBook.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    });
   
    return gBook;

}

function sortByPrice() {
    gBook.sort((a, b) => (a.price < b.price) ? 1 : -1)
    return gBook;

}



function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBook)
}

function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}