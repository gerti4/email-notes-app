

export default {
    props: ['book'],
    template: `
    <li class="book-preview-container">
        <img :src="book.thumbnail" class="book-img">
    <h4>Name:</h4> {{bookTitle}} 
    <h4>Price:</h4>{{bookPrice}}  
    <router-link :to="'/book/' + book.id" >Deatiels</router-link>
    </li>
    `,
    methods: {


    },
    computed: {
        bookPrice() {
            var num = this.book.listPrice.amount
            var coin = this.book.listPrice.currencyCode
            var price = new Intl.NumberFormat('he-IL', { style: 'currency', currency: coin }).format(num);
            return price
        },
        bookTitle() {
            return this.book.title
        },

    }

}