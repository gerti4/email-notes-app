'use strict'


function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now()
    }
}