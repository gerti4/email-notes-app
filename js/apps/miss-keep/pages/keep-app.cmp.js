'use strict'


import filterNotes from '../cmps/filter-notes.cmp.js'
import previewNotes from '../cmps/preview-notes.cmp.js'
import addNote from '../cmps/add-note.cmp.js'
import userMsg from '../../../general-cmps/user-nsg-general.cmp.js'
export default {
    template: `
    <section class="keep-app container">
    <user-msg class="note-modal"></user-msg>
        <filter-notes></filter-notes>
        <add-note></add-note>

        <preview-notes></preview-notes> 
             
    </section>
    `,
    components: {
        filterNotes,
        addNote,
        previewNotes,
        userMsg
    }
}