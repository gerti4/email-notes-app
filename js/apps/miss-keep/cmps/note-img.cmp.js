'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="img-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
          <img :src="note.info"/>
          <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    data() {
        return {
            val: ''
        };
    },
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },

    },
    components: {
        tools
    }
};