'use strict'

import { eventBus } from "../../../general-service/event-bus-service.js"

export default {
    template:`
    <section class="email-filter-container">
        <div v-if="checkWidth" class="filter-container-big">
        <input class="email-search" type ="text" placeholder="Search email" v-model="filterBy.searchKey"/>
        <label :class="all" for="all">All</label>
        <input id="all"type ="radio" hidden value="allEmails" v-model="filterBy.searchType"/>
        <label :class="read" for="read">Read</label>
        <input id="read" hidden type ="radio" value="readEmails" v-model="filterBy.searchType"/>
        <label :class="unread" for="unread">Unread</label>
        <input id="unread" hidden type="radio" value="unreadEmails" v-model="filterBy.searchType"/>
        <select v-model ="filterBy.sortBy" value="sortBy">
            <option value="date">Date</option>
            <option value="title">Title</option>
        </select>
        </div>
        <div v-else class="filter-container-small">
            <input class="email-search" type ="text" placeholder="Search" v-model="filterBy.searchKey"/>
            <select v-model="filterBy.searchType">
                <option value="allEmails" >All</option>
                <option value="readEmails">Read</option>
                <option value="unreadEmails">Unread</option>
            </select>

        </div>
    </section>`
    ,
    data(){
        return {
            filterBy: {
                searchKey: '',
                searchType: 'allEmails',
                sortBy:'date'
            },
            width: 0
        }
    },
    created(){
        this.width = document.querySelector('body').clientWidth;
    },
    computed:{
        checkWidth(){
            if(this.width>630) return true;
            else{
                this.filterBy.sortBy ='date'
                return false;
            }
            
        },
        all(){
            return{'opt-filter':this.filterBy.searchType === 'allEmails'}
        },
        read(){
            return{'opt-filter':this.filterBy.searchType === 'readEmails'} 
        },
        unread(){
            return{'opt-filter':this.filterBy.searchType === 'unreadEmails'}
            
        }
    },
    watch: {
            'filterBy.searchType'(){
                eventBus.$emit('filtered',this.filterBy)
                
            },
            'filterBy.searchKey'(){
                eventBus.$emit('filtered',this.filterBy)
            },
            'filterBy.sortBy'(){
                eventBus.$emit('filtered',this.filterBy);
                
            },

        }

}