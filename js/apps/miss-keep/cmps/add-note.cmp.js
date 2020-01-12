'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'
import selectNotetype from './select-notetype.cmp.js'

export default {
    template: `
    <section class="add-note">
        <div class="add-note-action flex align-center">
            <input class="input-note" type="type" v-model="note.info" :placeholder="[[instructions]]"/>
            <select-notetype :type="note.type" @setType="setNoteType"></select-notetype> 
        </div> 
        <transition name="slide-fade">
        <input v-show="note.info" v-model="note.title" class="input-note-title" type="type" placeholder="Give it a title..."/>
        </transition>
        <transition name="slide-fade">
        <div class="add-btn-conteiner" v-show="note.info"> 
            <button class="add-btn select"@click="addNote">Add</button>
            <button v-if="note.id" class="add-btn select"@click="emptyNote">Cancel</button>
        </div>
        </transition>
    </section>
    `,
    data() {
        return {
            note: {
                type: 'text-note',
                title: '',
                info: '',
                color: '',
                id: '',
                pin: false,
                pos: ''
            }
        }
    },
    created() {
        eventBus.$on('edit', id => {
            keepService.getNoteById(id)
                .then(note => {
                    this.note = note
                })
        })
    },
    methods: {
        addNote() {
            if (this.note.id) keepService.editNote(this.note)
                .then(() => {
                    this.emptyNote()
                    eventBus.$emit('show-msg', { txt: 'Note was edit', type: 'starred' })
                })
            else keepService.addNewNote(this.note)
                .then(() => {
                    this.emptyNote()
                    eventBus.$emit('show-msg', { txt: 'Note added', type: 'starred' })
                })
        },
        setNoteType(type) {
            this.note.type = type

        },
        updateNote(details) {
            if (details.type === 'edit') return
            else if (details.type === 'remove') this.emptyNote()
            else if (details.type === 'pin') this.note.pin = !this.note.pin
            else this.note.color = details.type
        },
        emptyNote() {
            this.note = {
                type: 'text-note',
                info: '',
                color: '',
                id: '',
                pin: false,
                pos: ''
            }
        }
    },
    computed: {
        instructions() {
            if (this.note.type === 'text-note') return `What's on your mind...`
            else if (this.note.type === 'note-img') return `Enter image URL...`
            else if (this.note.type === 'note-video') return `Enter video URL...`
            else if (this.note.type === 'note-audio') return `Enter audio URL...`
            else if (this.note.type === 'note-todos') return `Enter comma separated list...`
            else if (this.note.type === 'note-map') return `Say somethig about this loc...`
            else if (this.note.type === 'note-map-fram') return `Ener map location embed URL ...`
        }
    },
    components: {
        selectNotetype
    }

}