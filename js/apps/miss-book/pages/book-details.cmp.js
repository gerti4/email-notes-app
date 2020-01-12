
import service from '../services/service.js'

import longText from '../cmp/long-text.cmp.js'
import reviewAdd from '../cmp/review-add.cmp.js'


export default {
    // template:`
    // <section class="book-details">
    //     <ul class="book-details-container">
    //     <img class="img-book-details" :src="book.thumbnail"/>
    //         <div class="txt-details">
    //         <li>   <h4 class="details-txt">Title:</h4> <span>{{bookto.title}}</span></li>
    //         <li>    <h4 class="details-txt">Subtitle</h4> <span>:{{book.subtitle}}</span></li>
    //         <li>    <h4 class="details-txt">Authors</h4> <span>:{{book.authors}}</span></li>
    //         <li>   <h4 class="details-txt">PublishedDate</h4> <span>:{{book.publishedDate}}</span></li>
    //         <li>   <h4 class="details-txt">Description</h4>
    //         <long-text :txt="book.description"></long-text></li>
    //         <li>    <h4 >PageCount</h4> <span>:{{book.pageCount}}</span></li>
    //         <li>    <h4 >Categories</h4> <span>:{{book.categories}}</span></li>
    //         <li>    <h4 >Language</h4> <span>:{{book.language}}</span></li>

    //         <li><h4>Seniority</h4>{{oldNew}}</li>
    //         <li><h4>Reading Length</h4>{{readingLength}}</li>
    //         </div>
    //     </ul>
    //     <div class="next-prev">
    //     <router-link :to="'/book/' + prevBookId"> &lt; PREV BOOK  </router-link>
    //     <router-link :to="'/book/' + nextBookId">NEXT BOOK &gt; </router-link>
    //     </div>
    //     <review-add :book="book"></review-add>
       
    // </section>
    // `,
    template:`
    <section class="book-details">
        <ul class="book-details-container">
        <div class="img-links-container">
        <img class="img-book-details" :src="book.thumbnail"/>
        <div class="next-prev">
        <!-- <router-link class="prev-link" :to="'/book/' + prevBookId"> &lt; PREV BOOK  </router-link>
        <router-link :to="'/book/' + nextBookId">NEXT BOOK &gt; </router-link> -->
        <router-link class="prev-link" :to="'/book/' + prevBookId">↩ Prev</router-link>
        <router-link :to="'/book/' + nextBookId">Next ↪</router-link>
        </div>
        </div>
            <div class="txt-details">
            <li>   <h4 class="details-txt">Title:</h4> <span>{{bookto.title}}</span></li>
            <li>    <h4 class="details-txt">Subtitle</h4> <span>{{book.subtitle}}</span></li>
            <li>    <h4 class="details-txt">Authors</h4> <span>{{book.authors.join('')}}</span></li>
            <li>   <h4 class="details-txt">PublishedDate</h4> <span>{{book.publishedDate}}</span></li>
            <li>   <h4 class="details-txt">Description</h4>
            <long-text :txt="book.description"></long-text></li>
            <li><h4>Seniority</h4>{{oldNew}}</li>
            </div>
        </ul>
        
        <review-add :book="book"></review-add>
       
    </section>
    `,
    data() {
        return {
            book: '',
            nextBookId: '',
            prevBookId: '',
            currYear: new Date().getFullYear(),
        }
    },
    methods: {
        loadBook() {
            const bookId = this.$route.params.bookId;
            if (bookId) {
                service.getBookById(bookId)
                    .then(book => {
                        this.book = book
                        this.nextBookId = service.getNextBookId(book.id);
                        this.prevBookId = service.getPrevBookId(book.id);
                    })
            }
        },
    },
    computed: {
        oldNew() {
            if (this.currYear - this.book.publishedDate > 10) return 'Veteran Book'
            else if (this.currYear - this.book.publishedDate < 1) return 'New'
        },
        readingLength() {
            if (this.book.pageCount > 500) return 'Long reading'
            else if (this.book.pageCount > 200) return 'Decent Reading'
            else if (this.book.pageCount < 100) return 'Light Reading'
        },
        description() {
            return this.book.description
        },
        bookto() {
            return this.book
        }
    },
    created() {
        this.loadBook()
    },
    watch: {
        '$route.params.bookId'() {
            this.loadBook()
        }
    },
    components: {
        longText,
        reviewAdd,

    }

}