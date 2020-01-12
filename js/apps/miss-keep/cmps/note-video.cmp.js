'use strict'
import tools from './tools.cmp.js'

export default {
    props: ['note'],
    template: `
          <section class="video-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
            <iframe :src="this.note.info">
             </iframe>
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