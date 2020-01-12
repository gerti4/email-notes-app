'use strict'
import {eventBus} from '../services/event-bus.service.js'

export default{
    template:`
    <section class="user-msg" v-if="msg">
        {{msg}}
    </section>
    `,
    data(){
        return {
            msg:'',
        }
    },
    created(){
        eventBus.$on('show-msg', (msg)=>{
            this.msg = msg;
            setTimeout(()=>{
                this.msg = null;
            }, 3000)
        })
    },
    methods: {
        close() {
            this.msg = null;
        }
    }

}