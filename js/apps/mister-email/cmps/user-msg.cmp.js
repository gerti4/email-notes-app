'use strict'

import {eventBus} from '../../../general-service/event-bus-service.js'


export default {
    template:`
    <section class="user-msg-container" v-if="msg" :class="msg.type">
        <p>{{msg.txt}}</p>
    </section>
    `
    ,
    data(){
        return{
            msg: null
        }
    },
    created(){
        eventBus.$on('show-msg',(msg) => {
            this.msg = msg;
            setTimeout(()=>{
                this.msg = null;
            },3000)
        })
    }
}