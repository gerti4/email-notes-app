'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    template:`
    <section class="email-status-container" v-if="emailAmount">
        <div class="bar-container" ><p>{{showUnread}}</p>
            <div class="bar" v-bind:style="{ width: showUnread}"></div>
        </div>
    </section>
    `,
    data(){
        return{
            unreadCounter: -1,
            emailAmount: 0,
        }
    },
    computed:{
        showUnread(){
            eventBus.$emit('update-unread',this.unreadCounter)
            var percent = 100 - Math.floor((this.unreadCounter / this.emailAmount) * 100) 
            return percent+'%'
        }

    },
    created(){
        emailService.getEmailsAmount()
            .then(mailData =>{                
                this.unreadCounter = mailData.unread;
                this.emailAmount = mailData.length;
  
            })
        eventBus.$on('update-percent',()=>{            
            emailService.getEmailsAmount()
            .then(mailData =>{                
                this.unreadCounter = mailData.unread;
                this.emailAmount = mailData.length;
  
            })
        })
    }
}