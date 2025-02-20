"use server"

import { COLLECTION_ID, DATABASE_ID, BUCKET_ID, databases, storage } from "@/lib/appwrite"
import { ID } from "appwrite"
import { AppwriteFormData, extractFileId } from "@/lib/projects"


export const GetProjects = async () => {
    try {
        const projects = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
        return projects
    } catch (error) {
        console.error("Error fetching products:", error)
        return null
    }
}

const deleteImages = async (imageUrls: string[]) => {
    try {
        const imageIds = imageUrls.map(extractFileId);
        await Promise.all(imageIds.map((imageId) => storage.deleteFile(BUCKET_ID, imageId)));
    } catch (error) {
        console.error("Error deleting images:", error);
    }
};


export const deleteProjects = async (ids: string[]) => {
    try {
        const projects = await Promise.all(
            ids.map((id) => databases.getDocument(DATABASE_ID, COLLECTION_ID, id))
        );

        const imageUrls = projects.flatMap((project) => [
            ...project.images,
            project.beforeImage,
            project.afterImage,
        ].filter(Boolean));

        await deleteImages(imageUrls);
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
    return storage.getFileView(BUCKET_ID, response.$id);
}


export const createProjectDocument = async (formData: AppwriteFormData, imageIds: string[], beforeImageId: string | null, afterImageId: string | null, category: string | null) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                completionDate: formData.completionDate,
                area: formData.area,
                clientName: formData.client,
                designerName: formData.designer,
                category: category,
                images: imageIds,
                beforeImage: beforeImageId,
                afterImage: afterImageId,
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating project document:", error);
        throw error;
    }
};
