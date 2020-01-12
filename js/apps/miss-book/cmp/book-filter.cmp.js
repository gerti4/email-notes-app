


export default {
    template: `
    <section class="book-filter">
    <h2>Search your book</h2>
        <input type="text" v-model="filterBy.name" placeholder="Book Name">
        <input type="number" v-model="filterBy.toPrice" @input="updateFilter" placeholder="Max Price">
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods: {
        updateFilter() {
            if (!this.filterBy.toPrice) this.filterBy.toPrice = Infinity
        }

    },
    computed: {

    },
    created() {
        this.$emit('filtered', this.filterBy)
    }

}