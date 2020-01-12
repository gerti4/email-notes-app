'use strict'

import emailStatus from '../cmps/email-status.cmp.js'
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    template:`
    <section v-if="checkWidth" class="email-app-header-container">
        <div class="compose"><router-link to="/email/compose">Compose</router-link></div>
        <nav>
            <router-link class="inbox-link" to="/email" :class="{'inbox-link-first': checkRoute}">Inbox <span v-if="unreadMails" class="unread-mails-counter"> {{unreadMails}}</span></router-link>
            <router-link class="starred-link" to="/email/starred">Starred</router-link>
            <router-link class="draft-link" to="/email/draft">Drafts</router-link>
        </nav>
        <email-status></email-status>
    </section>
    <section v-else @click="toggleLinks" class="email-app-header-container-small"><span class="menu-btn">☰</span>
        <div class="cover-links" v-if="openModal">
        <nav class="links-small-header">
            <router-link class="inbox-link" to="/email">Inbox <span v-if="unreadMails" class="unread-mails-counter"> {{unreadMails}}</span></router-link>
            <router-link class="draft-link" to="/email/draft">Drafts</router-link>
            <router-link class="starred-link" to="/email/starred">Starred</router-link>
            <router-link to="/email/compose" >Compose</router-link>
        </nav>
        </div>

    </section>
    `,
    data(){
        return {
            unreadMails: 0,
            openModal:false,
            width: 0 
        }
    },
    created(){
        this.width=document.querySelector('body').clientWidth
        eventBus.$on('update-unread',(counter)=>{
            this.unreadMails = counter
        })
        
    },
    methods:{
        toggleLinks(){
            this.openModal = !this.openModal
        }
    },
    computed:{
        checkWidth(){
            if(this.width >630) return true;
            return false
        },
        checkRoute(){
            if(this.$route.path === '/email') return true;
        }
    },
    components: {
        emailStatus
    },
    watch: {
        $route(to){
            console.log(to);
        }
        
    }
}