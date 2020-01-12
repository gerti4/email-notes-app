

export default {
    props: ['txt'],
    template: `
    <section v-if="txt">
        <div v-if="isReadMore">
            <p>{{txt}}
            <a href="#" @click.prevent="toggleMore">Read less</a>
            </p>
        </div>
        <div v-else>
            <p>{{descrip}}
            <a href="#" @click.prevent="toggleMore">Read more</a>
            </p>
        </div>
    </section>
    `,
    data() {
        return {
            isReadMore: false
        }

    },
    methods: {
        toggleMore() {
            this.isReadMore = !this.isReadMore
        }

    },
    computed: {
        descrip() {
            if (this.txt.length > 100) {
                return this.txt.substring(0, 100)
            } else return this.txt
        },


    },
}