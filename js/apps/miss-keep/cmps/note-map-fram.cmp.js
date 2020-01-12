'use strict'

import tools from './tools.cmp.js'

export default {
    props: ['note'],
    template: `
          <section class="img-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
            <iframe :src="note.info" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
          <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },

    },
    components: {
        tools
    }
};



