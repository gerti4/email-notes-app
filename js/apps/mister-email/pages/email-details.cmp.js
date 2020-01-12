'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'



export default {
    template:`
    <section class="email-details-container" v-if="email">
        <h2 class="subject-details">{{email.subject}}</h2>
        <h4>{{email.body}}</h4>
        <h5>{{email.from}}</h5>
        <h6>Sent: {{new Date(email.sentAt)}}</h6>
        <div class="btn-details-container">
            <button class="btn-details" @click="returnToEmails">↩</button>
            <button class="btn-details" @click="replayEmail(email)" >Reply</button>
        </div>
    </section>
    `,
    data(){
        return{
            email: null
        }
    },
    methods: {
        loadEmail() {
            const emailId = this.$route.params.id;
            emailService.getEmailById(emailId)
                .then(email => {                    
                    this.email = email;}); 
        },
        returnToEmails(){
            emailService.showMoreFromEmail(this.$route.params.id)
                .then(()=>{
                    this.$router.push('/email')
                })
        },
        replayEmail(email){
            emailService.showMoreFromEmail(this.$route.params.id)
                .then(()=>{
                    this.$router.push(`compose/${email.id}`)
                })
        }
    },
    created() {
        this.loadEmail();
    },
    watch: {
        '$route.params.id'() {
            console.log('Route param: "id" changed');
        }
    }
}