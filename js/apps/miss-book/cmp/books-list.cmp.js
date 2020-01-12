

import bookPreview from './book-preview.cmp.js'



export default {
    props: ['books'],
    template: `
    <section class="book-list">
        <ul>
            <book-preview v-for="(currBook) in books" :key="currBook.id" :book="currBook"></book-preview>
        </ul>
    </section>
    `,
    components: {
        bookPreview,

    }

}