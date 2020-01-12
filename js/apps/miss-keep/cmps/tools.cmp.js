'use strict'
import { eventBus } from '../../../general-service/event-bus-service.js'
export default {
    props: ['noteId'],
    template: `
    <section class="action-btn-container">
    <input type="color" @change="updateNote(color)" v-model="color" class="tools-input-color"/>
    <button @click="updateNote('remove')" class="tools-btn">🗑</button>
    <button @click="updateNote('edit')" class="tools-btn">✎</button>
    <button @click="updateNote('send')" class="tools-btn">✉</button>
    <button @click="updateNote('pin')" class="tools-btn">&#x1f4cc;</button>
    </section>
    `,
    data() {
        return {
            color: ''
        }
    },
    methods: {
        updateNote(type) {
            if (type === 'edit') eventBus.$emit('edit', this.noteId);
            this.$emit('update', { id: this.noteId, type });
        },
    }

}