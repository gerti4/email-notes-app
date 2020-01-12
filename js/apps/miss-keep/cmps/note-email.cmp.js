'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="todos-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
            <ul>
                <li v-for="susject in note.info">
                    {{susject}}
                </li>
            </ul>
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