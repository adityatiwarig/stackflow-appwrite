import env from '@/app/env';

import {Avatars,Client,Databases,Storage,Users} from 'node-appwrite'  // SERVER-SIDE APPWRITE SDK

//SERVER-SIDE BACKEND APPWRITE 

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key

;

// WHI CONFIG CLIENT WALA


const users = new Users(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client , users, databases, avatars, storage};
