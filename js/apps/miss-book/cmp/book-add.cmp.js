'use strict'
import servie from '../services/service.js'

export default {
    template: `
    <section class="book-add">
    <h3>Find your next book online</h3>
    <input type="text" v-model="search" placeholder="Google Boooks">
    <span v-if="isDone">results:{{res.totalItems}}</span>{{msg}}
    <ul v-if="isDone">
    <li v-for="(item) in res.items" class="search-res">
        {{item.volumeInfo.title}}<button @click="addNewBook(item)">+</button>
    </li>
    </ul>
    </section>
    `,
    data() {
        return {
            search: '',
            res: null,
            msg: '',
            isDone: false
        }
    },
    created() {
        this.debouncedGetRes = _.debounce(this.getRes, 2000)
    },
    methods: {
        getRes() {
            this.msg = 'Thinking...'
            if (this.search) {
                servie.getBooksFromGoogle(this.search)
                    .then(res => {
                        this.res = res
                        this.isDone = true
                        this.msg = ''
                    })
            } else {
                this.isDone = false
                this.msg = ''
                this.res = null
            }
        },
        addNewBook(item) {
            // console.log(item);
            servie.addGoogleBook(item)

        }

    },
    watch: {
        search(val) {
            if (this.search) {
                this.msg = 'Waiting for you to stop typing...'
                this.debouncedGetRes()
            }
        }
    }
}