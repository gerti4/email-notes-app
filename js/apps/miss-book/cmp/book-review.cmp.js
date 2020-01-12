

export default {
    props: ['review'],
    template: `
    <li class="book-item-container">
        Name: {{review.name}} Publish AT: {{review.date}} 
        <p>Review: {{review.reviewTxt}}</p>
        <h4>Rate: {{review.rate}}</h4>
        <button @click="removeReview(review.id)">X</button>
    </li>
    `,
    methods: {
        removeReview(){
            this.$emit('remove', this.review.id)
        }

    },
}