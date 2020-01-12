
import booksAPI from './books-service.js'
import utilService from './utils-service.js'

export default {
    getBooks,
    getBookById,
    addReview,
    removeReview,
    getBooksFromGoogle,
    addGoogleBook,
    getNextBookId,
    getPrevBookId
}
getBooks()
var gNextId = 101
var gBooks;
function getBooks() {
    var books = booksAPI.gBooks
    books.forEach(book => book.reviews = [])
    gBooks = books
    return Promise.resolve(gBooks)
}

function getBookById(bookId) {
    // var books = booksAPI.gBooks
    var bookToShow = gBooks.find(book => book.id === bookId)
    return Promise.resolve(bookToShow)
}
function addReview(bookId, review) {
    review.id = gNextId++
    // var books = booksAPI.gBooks
    var bookToShow = gBooks.find(book => book.id === bookId)
    if (!bookToShow.reviews) bookToShow.reviews = []
    bookToShow.reviews.unshift(review)
    return Promise.resolve(bookToShow)
}
function removeReview(bookId, reviewId) {
    // var books = booksAPI.gBooks
    var book = gBooks.find(book => bookId === book.id)
    var reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
    book.reviews.splice(reviewIdx, 1)
    return Promise.resolve(book)
}


function getBooksFromGoogle(search) {
    var prmAns = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:&key=AIzaSyDFLd92zYvTgSX-4hteufAPXOv6KBGUE8A`)

    var prm1 = prmAns.then(res => {
        return res.data;
    })

    return prm1;
}
function addGoogleBook(googleBook) {
    gBooks.unshift({
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.infoLink,
        authors: googleBook.volumeInfo.authors,
        publishedDate: googleBook.volumeInfo.publishedDate,
        description: googleBook.volumeInfo.description,
        pageCount: googleBook.volumeInfo.pageCount,
        reviews: [],
        categories: googleBook.volumeInfo.categories,
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail,
        language: googleBook.volumeInfo.language,
        listPrice: {
            amount: 100,
            currencyCode: "ILS",
            isOnSale: false
        }
    })


}


function getNextBookId(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId);
    idx++;
    if (idx === gBooks.length) idx = 0;

    return gBooks[idx].id;
}
function getPrevBookId(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId);
    idx--;
    if (idx <= 0) idx = gBooks.length - 1;

    return gBooks[idx].id;
}
