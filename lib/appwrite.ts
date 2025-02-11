import { Client, Databases, Account } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// export const storage = new Storage(client);
export const databases = new Databases(client);
export const account = new Account(client);
export const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
export const BUCKET_ID = process.env.BUCKET_ID;
export const DATABASE_ID = process.env.PROJECT_DATABASE_ID!;
export const COLLECTION_ID = process.env.PROJECT_COLLECTION_ID!;