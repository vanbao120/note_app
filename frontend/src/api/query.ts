export const GET_FOLDER = `
query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      name
      id
      notes {
        content
        id
        updatedAt
      }
    }
  }
`

export const GET_ALL_FOLDERS = `
query {
    folders {
      name
      createdAt
      id
    }
  }
`

export const GET_NOTE = `
query Note($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }
`

export const REGISTER = `mutation register($uid: String!, $name: String!) {
  register(uid: $uid, name: $name) {
    uid
    name
  }
}`

export const ADD_NEW_FOLDER = `mutation addFolder($name: String!) {
  addFolder(name: $name) {
    name
    author {
      name
    }
  }
}`

export const ADD_NEW_NOTE = `mutation addNote($content: String!, $folderId: String!) {
  addNote(content: $content, folderId: $folderId) {
    content
    id
  }
}`

export const UPDATED_NOTE = `mutation updateNote($content: String!, $id: String!) {
  updateNote(content: $content, id: $id) {
    content
    id
  }
}`

export const DELETE_FOLDER = `mutation deleteFolder($folderId: String!) {
  deleteFolder(folderId: $folderId) {
    message
    deletedCount
  }
}`