'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="todos-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
            <ul>
                <li v-for="objTodo in note.info" @click="markTodo(objTodo.id)" 
                :class="{'done-todo':objTodo.isDone}">
                    {{objTodo.todo}}
                </li>
            </ul>
             <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },
        markTodo(todoId) {
            var noteId = this.note.id
            this.$emit('mark', { todoId, noteId });
        }
    },
    components: {
        tools
    }
};