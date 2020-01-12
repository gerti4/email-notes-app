'use strict'
import { eventBus } from '../../../general-service/event-bus-service.js'


export default {
    template: `
    <section class="notes-filter">
    <h2>Search Note</h2>
        <input type="text" @input="setFilter" v-model="filterBy.title" :placeholder="searchBy">
        <select v-model="filterBy.type" @change="setFilter">
        <option value="title">Title</option>
        <option value="text">Text</option>
        <option value="img">Image</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="todos">Todos</option>
        <option value="map">Map</option>
        <option value="map-fram">Map frame</option>
    </select>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: 'title'
            },
        }
    },
    methods: {
        setFilter() {
            eventBus.$emit('filterd', this.filterBy)
        }
    },
    computed: {
        searchBy() {
            return `Search by ${this.filterBy.type}`
        }
    },
    created() {

    },

}