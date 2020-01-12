
import service from '../services/service.js'

import bookFilter from '../cmp/book-filter.cmp.js'
import bookList from '../cmp/books-list.cmp.js'
import bookAdd from '../cmp/book-add.cmp.js'

export default {
    template: `
    <section class="book-app">
    <book-filter @filtered="setFilter"></book-filter>
    <book-add></book-add>
    <book-list :books="booksToShow"></book-list>
    </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        }
    },
    methods: {
        selectBook(selectBook) {
            this.$emit('selected', selectBook)
        },
        showBookDetails(book) {
            this.selectedBook = book
            this.isModal = !this.isModal
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        toggleModal() {
            this.isModal = !this.isModal
        }
    },
    created() {
        service.getBooks()
            .then(books => this.books = books)
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            var regex = new RegExp(`${this.filterBy.name}`, 'i');
            return this.books.filter(book =>
                regex.test(book.title) && book.listPrice.amount <= this.filterBy.toPrice
            )
        },


    },
    components: {
        bookFilter,
        bookList,
        bookAdd

    }

}