import express from 'express'
import http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
import { resolvers } from './resolver'
import mongoose from 'mongoose'
const app = express();
import 'dotenv/config'
import '../firebaseConfig'
import { getAuth } from 'firebase-admin/auth'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const typeDefs = fs.readFileSync(path.join(process.cwd(), "schema.graphql"), {
    encoding: "utf-8",
});
const port = process.env.PORT || 4000
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wiotwkt.mongodb.net/?retryWrites=true&w=majority`
const authorizationJWT = async (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization as string
    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1]
        getAuth().verifyIdToken(accessToken).then((decodeToken) => {
            res.locals.uid = decodeToken.uid
            next()
        }).catch((error) => {
            console.log(error)
            return res.status(403).json({ message: 'Forbidden', error })
        }
        )
    } else {
        next()
        // return res.status(401).json({ message: 'Unauthorized' })
    }
}
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
});

const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
            };
        },
    },
    ],
})
    ; (async () => {
        await server.start()
        app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
            context: async ({ req, res }) => {
                return { uid: res.locals.uid }
            }
        }))
    })()
mongoose.set('strictQuery', false);
mongoose.connect(URI).then(async () => {
    console.log('Connected to Mongoose');
    await new Promise((resolve: any) => httpServer.listen({ port }, resolve))
    console.log(`Server already listening on port ${port}`);
})

