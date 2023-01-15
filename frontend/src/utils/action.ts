import { callApi } from "../api/callApi";
import { ADD_NEW_NOTE, UPDATED_NOTE } from "../api/query";

export const addNewNote = async ({ params, request }: any) => {
    const newNote = await request?.formData()
    const formDataObj: any = {};

    newNote?.forEach((value: any, key: any) => (formDataObj[key] = value));
    const query = ADD_NEW_NOTE

    const { addNote } = await callApi({
        body: JSON.stringify({
            query,
            variables: formDataObj
        })
    }) as any
    return addNote
}

export const updateNote = async ({ params, request }: any) => {
    const newNote = await request?.formData()
    const formDataObj: any = {};

    newNote?.forEach((value: any, key: any) => (formDataObj[key] = value));
    const query = UPDATED_NOTE

    const { updateNote } = await callApi({
        body: JSON.stringify({
            query,
            variables: formDataObj
        })
    }) as any
    return updateNote
}