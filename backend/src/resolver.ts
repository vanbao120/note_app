import { AuthorModel, FolderModel, NoteModel, NotificationModel } from '../models'
import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value: any) {
            return new Date(value)
        },
        serialize(value: any) {
            return value.toISOString()
        }
    }),
    Query: {
        folders: async (_: any, args: any, context: any) => {
            const folders = await FolderModel.find({
                authorId: context.uid
            }).sort({
                updatedAt: 'desc'
            })
            return folders
        },
        folder: async (parents: any, args: any) => {
            const folderId = args.folderId
            const data = await FolderModel.findOne({
                _id: folderId
            })
            return data
        },
        note: async (parent: any, args: any) => {
            const noteId = args.noteId
            const note = await NoteModel.findById(noteId)
            return note
        }
    },
    Folder: {
        author: async (parents: any, args: any) => {
            const authorId = parents.authorId
            const author = await AuthorModel.findOne({
                uid: authorId
            })
            return author
        },
        notes: async (parents: any, args: any) => {
            const notes = await NoteModel.find({
                folderId: parents.id
            }).sort({
                updatedAt: 'desc'
            })
            return notes
        }
    },
    Mutation: {
        addFolder: async (parents: any, args: any, context: any) => {
            const newFolder = new FolderModel({
                ...args,
                authorId: context.uid
            })
            pubsub.publish('FOLDER_CREATED', {
                folderCreated: {
                    message: 'A new folder created'
                }
            });
            await newFolder.save()
            return newFolder
        },
        addNote: async (parents: any, args: any) => {
            const newNote = new NoteModel({
                ...args,
            })
            await newNote.save()
            return newNote
        },
        updateNote: async (parents: any, args: any) => {
            const noteId = args.id
            const note = await NoteModel.findByIdAndUpdate(noteId, args)
            return note
        },
        register: async (parents: any, args: any) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid })
            if (!foundUser) {
                const newUser = new AuthorModel(args)
                await newUser.save()
                return newUser
            }
            return foundUser
        },
        pushNotification: async (parents: any, args: any) => {
            const newNotification = new NotificationModel(args)
            pubsub.publish('PUSH_NOTIFICATION', {
                notification: {
                    message: args.content
                }
            });
            await newNotification.save()
            return { message: 'Success' }
        },
        deleteFolder: async (parents: any, args: any) => {
            const folderId = args.folderId
            const deleteFolder = await FolderModel.deleteOne({
                _id: folderId,
            })
            if (deleteFolder.deletedCount) {
                return {
                    message: 'Delete successfully',
                    deletedCount: deleteFolder.deletedCount
                }
            }
            return {
                message: 'Delete failed',
                deletedCount: 0
            }
        }
    },
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED']),
        },
        notification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
        }
    }
}