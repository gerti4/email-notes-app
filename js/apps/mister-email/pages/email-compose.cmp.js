'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'


export default {
    template:`
    <section class="email-compose-container">
        <p class="new-msg">New Message</p>
        <form @submit.prevent="sendEmail">
            <input class="send-to" type="text" placeholder="To: Myself">
            <input class="from-compose" type="text" placeholder="From:" v-model="email.from">
            <input class="subject-compose" type="text" placeholder="Subject:" v-model="email.subject">
            <textarea class="body-compose" ref="inputBody" cols="30" rows="10" v-model="email.body"></textarea>
            <button class="send-compose">Send</button>
        </form>
        <button class="return-compose" @click="returnToInbox">↩</button>
    </section>
    `,
    data(){
        return {
            email: {
                subject: '',
                body: '',
                from: ''
            }
        }
    },
    methods:{
        sendEmail(){
            let timerInterval
            Swal.fire({
            title: 'Sending Email...',
            timer: 2000,
            onBeforeOpen: () => {
            Swal.showLoading()
            },
            onClose: () => {
            clearInterval(timerInterval)
             }
            })

            this.email.type = this.checkEmailData();
            emailService.addNewMail(this.email)
                    .then(()=>{
                        var msg;
                        if(this.email.type === 'draft'){
                            msg = {
                                txt: 'Invalid Email! - stored in draft.',
                                type: 'draft'
                            }
                        }
                        else if(this.email.type === 'inbox'){
                            msg = {
                                txt: 'You got a new Mail!',
                                type: 'seccuss'
                            }
                        }
                        setTimeout(()=>{
                            eventBus.$emit('show-msg',msg)
                            this.$router.push('/email')
                        },2100)
                        eventBus.$emit('update-percent')
                        this.email={};
                    })
            } 
        ,
        checkEmailData(){
            if(!this.email.subject || !this.email.body ||!this.email.from) return 'draft';
            return 'inbox';  
        },
        returnToInbox(){
            this.$router.push('/email')
            
        }
    },
    created () {
        var regex = new RegExp('edit');
        var isEditing = regex.test(this.$route.path);
            
        const emailId = this.$route.params.id;   

        if(emailId && isEditing)
        emailService.getEmailById(emailId)
            .then(email =>{
                    if(!email.from) this.email.from = 'Edit: Sender'
                    else this.email.from = email.from;
                    this.email.subject = 'Edit: '+email.subject;
                    this.email.body = email.body;
                    this.email.id = email.id
                    console.log(email);
                    
                })
            
        else if(emailId)
            emailService.getEmailById(emailId)
                .then(email =>{
                    this.email.subject = 'RE: '+email.subject;
                    this.email.body = email.body;
                })
        else{
            this.email.subject = '';
            this.email.body = '';
        }
    },
    watch: {
        '$route.params.id'() {
            console.log(this.$route.path);
            
            const emailId = this.$route.params.id;
            
            
            if(!emailId) {
                this.email = {}
            }
        }
    }
    
}



