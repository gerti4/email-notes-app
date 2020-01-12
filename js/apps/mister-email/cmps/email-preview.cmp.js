'use strict'

import {eventBus} from '../../../general-service/event-bus-service.js'
import emailService from '../services/email-service.js'
import longText from '../cmps/long-text.cmg.js'



export default {
    props:["email"],
    template:`
    <li  class="mail-container" :class="isRead">
        <p class="from-container">From: <span class="from-name">{{isEmptySender}}</span></p>
        <p class="subject">{{isEmptySubject}}</p>
        <long-text @edit-draft="editDraftMail" @toggle-read="toggleRead" @starred="makeEmailStarred" class="body" :txt="isEmptyBody" :valid="isValid" :read="email.isRead" :starred="isStarred" :link="email.isLink"></long-text>
    </li>`
    ,
    computed: {
        isEmptySubject(){
            if(!this.email.subject) return 'No subject'
            return this.email.subject
        },
        isEmptyBody(){
            if(!this.email.body) return 'Missing content...'
            return this.email.body
        },
        isEmptySender(){
            if(!this.email.from) return 'No sender'
            return this.email.from
        },
        isRead(){
            return{'unread-mail': !this.email.isRead};
        },
        isValid(){
            if(this.email.type === 'inbox'||this.email.type === 'starred') return true;
            return false;
        },
        isStarred(){
            if(this.email.type === 'starred') return true;
            return false;
        }

    },
    methods:{
        makeEmailStarred(){
            
            
            emailService.starredEmail(this.email.id)
                .then(()=>{
                    var starredPath = this.$route.path
                    if(starredPath.includes('starred')){
                        this.$emit('render-starred')
                    }
                    else{
                        if(this.email.type !== 'starred') return
                        var msg ={
                            txt: 'Email is marked in Starred',
                            type: 'email-marked'
                        }
                        eventBus.$emit('show-msg',msg);   
                    }
                }) 
        },
        toggleRead(){
            emailService.toggleReadEmail(this.email.id)
                .then(()=>{ 
                    eventBus.$emit('update-percent');
                }) 
        },
        editDraftMail(){
            this.$router.push(`compose/${this.email.id}/edit`)  
        }
        
    },
    components:{
        longText
    }
}