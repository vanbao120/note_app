import { createBrowserRouter, Outlet } from "react-router-dom";
import { callApi } from "../api/callApi";
import { GET_ALL_FOLDERS, GET_FOLDER, GET_NOTE } from "../api/query";
import Note from "../components/Note";
import NoteList from "../components/NoteList";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { addNewNote, updateNote } from "../utils/action";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = () => {
    return <AuthProvider>
        <Outlet />
    </AuthProvider>
}
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: '/login'
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home />,
                        path: '/',
                        loader: async () => {
                            const query = GET_ALL_FOLDERS
                            const data = callApi({
                                body: JSON.stringify({
                                    query,
                                })
                            })
                            return data

                        },
                        children: [
                            {
                                element: <NoteList />,
                                path: 'folder/:folderId',
                                action: addNewNote,
                                loader: async ({ params: { folderId } }) => {
                                    const query = GET_FOLDER
                                    const data = callApi({
                                        body: JSON.stringify({
                                            query,
                                            variables: {
                                                folderId
                                            }
                                        })
                                    })
                                    return data
                                },
                                children: [
                                    {
                                        element: <Note />,
                                        path: 'note/:noteId',
                                        action: updateNote,
                                        loader: async ({ params: { noteId } }) => {
                                            const query = GET_NOTE
                                            const data = callApi({
                                                body: JSON.stringify({
                                                    query,
                                                    variables: {
                                                        noteId
                                                    }
                                                })
                                            })
                                            return data
                                        },
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
])