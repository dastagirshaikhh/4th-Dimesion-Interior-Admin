"use server"

import { COLLECTION_ID, DATABASE_ID, BUCKET_ID, databases, storage } from "@/lib/appwrite"
import { ID } from "appwrite"


export const GetProjects = async () => {
    try {
        const projects = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
        return projects
    } catch (error) {
        console.error("Error fetching products:", error)
        return null
    }
}

export const deleteProjects = async (ids: string[]) => {
    try {
        await Promise.all(ids.map((id) => databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id)))
    } catch (error) {
        console.error("Error deleting products:", error)
    }
}

export async function GetProductById(productId: string) {
    try {
        return await databases.getDocument(DATABASE_ID, COLLECTION_ID, productId)
    } catch (error) {
        console.error(`Error fetching project with ID ${productId}:`, error)
        return null
    }
}

export const ImageUpload = async (imageFile: File) => {
    const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        imageFile
    );
    return response.$id;
}
// const storage_url = await storage.getFile(
//     BUCKET_ID,
//     response.$id)
// console.log("images url",storage_url)
