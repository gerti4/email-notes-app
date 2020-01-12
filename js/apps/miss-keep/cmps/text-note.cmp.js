'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="text-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
             <h3> {{note.info}}</h3>
             <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            console.log(details);
            this.$emit('update', details);

        },
    },
    computed: {

    },
    components: {
        tools
    }
};