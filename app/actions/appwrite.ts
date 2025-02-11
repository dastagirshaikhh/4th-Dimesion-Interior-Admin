"use server";
import { COLLECTION_ID, DATABASE_ID, databases } from "@/lib/appwrite";

export const GetProjects = (async () => {
    try {
        const projects = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID
        );
        return projects;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
});


export const deleteProjects = async (ids: string[]) => {
    try {
        await Promise.all(ids.map((id) => databases.deleteDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id
        )));
    } catch (error) {
        console.error('Error deleting products:', error);
    }
}


export async function GetProductById(productId: string) {
    try {
        return await databases.getDocument(
            DATABASE_ID,
            COLLECTION_ID,
            productId
        );
    } catch (error) {
        console.error(`Error fetching project with ID ${productId}:`, error);
        return null;
    }
}

