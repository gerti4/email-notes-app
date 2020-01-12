'use strict'





export default {
    props:['txt','show','valid','read','starred','link'],
    template:`
    <section class="long-text-container">
        <a @click.stop=""class="link-txt" v-if="link" target="_blank":href="this.txt">{{showTxt}}</a>
        <p v-else>{{showTxt}}</p>
        <div class="long-text-btn-container">
            <button v-if="!show && !valid" @click.stop="editDraft" class="edit-btn-long-txt">✎</button>
            <button v-if="!show && valid" title="Mark" @click.stop="makeStarred" class="btn-starred" v-bind:style="{ color: getStarredColor }">{{isEmailStarred}}</button>

            <button v-if="!show && valid && isEmailRead" @click.stop="readToggle" class="btn-read" v-bind:style="{ color: getUnreadColor }"><i class="fa fa-envelope-open-o" aria-hidden="true"></i></button>
            <button v-else-if="!show && valid && !isEmailRead" @click.stop="readToggle" class="btn-read" v-bind:style="{ color: getUnreadColor }"><i class="fa fa-envelope-o" aria-hidden="true"></i></button>

        </div>
    </section>
     `
    ,
    computed: {
        showTxt(){
            if(this.show) return this.txt.substring(0,80)+'...'
            else if(this.txt.length>100) return this.txt.substring(0,40)+'...'
            else return this.txt
        },
        isEmailRead(){
            if(this.read) return true;
            return false
        },
        isEmailStarred(){
            if(this.starred) return '✩'
            return '⚬'
        },
        getStarredColor(){
            if(this.starred) return '#05031ffc'; 
        },
        getUnreadColor(){
            if(!this.read) return '#020238e0';
        },
        getLink(){
            return this.txt
            
        }
        
    },
    methods:{
        makeStarred(){            
            this.$emit('starred')     
        },
        readToggle(){
            this.$emit('toggle-read')
        },
        editDraft(){
            this.$emit('edit-draft')  
        }
    }
}