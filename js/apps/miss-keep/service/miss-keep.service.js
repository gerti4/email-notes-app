'use strict'
import utilsService from '../../../../lib/utils.js'
export default {
    addNewNote,
    getNotes,
    updateNote,
    getNoteById,
    editNote,
    markTodo
}
var gNextId = 104
var gNotes = [{
    id: 101,
    type: 'text-note',
    title: 'important',
    info: 'Appsus sprint 3',
    color: 'white',
    pin: false,
    pos: null

},
{
    id: 102,
    type: 'note-img',
    title: 'car',
    info: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3KjW6-2hhv4GMdYLAqC3kRS3GFE-dy46Q1tCFJ8sq2XgSitt&s',
    color: 'white',
    pin: false,
    pos: null
},
{
    id: 103,
    type: 'note-video',
    title: '6',
    info: 'https://www.youtube.com/embed/iSgUMPHQEWw',
    color: 'white',
    pin: false,
    pos: null
},
]


function getNotes() {
    var notesFromEmail = utilsService.load('email-toKeep')
    if (notesFromEmail) {
        getNoteById(notesFromEmail.id)
            .catch(() => addEmailNote(notesFromEmail))
    }
    var notes = utilsService.load('notes')
    console.log('storeg', notes);

    if (notes) gNotes = notes
    return gNotes
}
function getNoteById(id) {
    var note = gNotes.find(note => id === note.id)
    if (note) return Promise.resolve(note)
    else return Promise.reject()

}
function addEmailNote(email) {
    gNotes.unshift({
        id: email.id, type: 'note-email', title: 'email',
        info: [email.subject, email.body], color: 'greenyellow', pin: false
    })
    utilsService.store('notes', gNotes)

}

function addNewNote(note) {
    var newNote = note
    console.log(newNote);

    if (note.type === 'note-todos') {
        newNote.info = note.info.split(',').map(todo => {
            return { id: utilsService.makeId(3), isDone: false, todo }
        })
    }
    if (note.type === 'note-video') {
        newNote.info = `https://www.youtube.com/embed/` + _getParameterByName('v', note.info)
    }
    if (note.type === 'note-map') {
        getPosition()
            .then(res => {
                newNote.pos = { lat: res.coords.latitude, lng: res.coords.longitude }
                utilsService.store('notes', gNotes)
            })
    }
    if (note.type === 'note-map-fram') newNote.info = note.info.split('"')[1]
    newNote.id = utilsService.makeId(3)
    gNotes.unshift(newNote)
    utilsService.store('notes', gNotes)
    return Promise.resolve()
}
function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}

function updateNote(details) {
    var msg = ''
    if (details.type === 'remove') {
        removeNote(details)
        msg = `Note has been remove`
    }
    else if (details.type === 'pin') {
        pinNote(details)
        msg = `Note has been pinned/unpinned`
    }
    else if (details.type === 'send') {
        sendNote(details)
        msg = `Note has been send to email`
    }
    else {
        changeNoteColor(details)
        msg = `Note color has been change`
    }
    utilsService.store('notes', gNotes)
    return Promise.resolve(msg)
}
function sendNote(details) {
    var note = gNotes.find(note => details.id === note.id)
    utilsService.store('note toEmail', note)
    return Promise.resolve()
}
function pinNote(details) {
    var note = gNotes.find(note => details.id === note.id)
    note.pin = !note.pin
    return Promise.resolve()
}
function changeNoteColor(details) {
    var note = gNotes.find(note => details.id === note.id)
    note.color = details.type
    return Promise.resolve()
}
function removeNote(details) {
    var idx = gNotes.findIndex(note => details.id === note.id)
    gNotes.splice(idx, 1)
    return Promise.resolve()
}
function editNote(editNote) {
    var idx = gNotes.findIndex(note => editNote.id === note.id)
    gNotes.splice(idx, 1, editNote)
    return Promise.resolve()
}
function markTodo(todoDetails) {
    var note = gNotes.find(note => note.id === todoDetails.noteId)
    var todo = note.info.find(todo => todo.id === todoDetails.todoId)
    todo.isDone = !todo.isDone
    utilsService.store('notes', gNotes)
    return Promise.resolve()
}

function _getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}