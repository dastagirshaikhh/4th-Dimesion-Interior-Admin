// "use server";

// import { COLLECTION_ID, DATABASE_ID, BUCKET_ID, databases, storage } from "@/lib/appwrite";
// import { ID } from "appwrite"

// export const GetProjects = (async () => {
//     try {
//         const projects = await databases.listDocuments(
//             DATABASE_ID,
//             COLLECTION_ID
//         );
//         return projects;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return null;
//     }
// });


// export const deleteProjects = async (ids: string[]) => {
//     try {
//         await Promise.all(ids.map((id) => databases.deleteDocument(
//             DATABASE_ID,
//             COLLECTION_ID,
//             id
//         )));
//     } catch (error) {
//         console.error('Error deleting products:', error);
//     }
// }


// export async function GetProductById(productId: string) {
//     try {
//         return await databases.getDocument(
//             DATABASE_ID,
//             COLLECTION_ID,
//             productId
//         );
//     } catch (error) {
//         console.error(`Error fetching project with ID ${productId}:`, error);
//         return null;
//     }
// }

// export async function addProject(formData: FormData) {
//     try {
//         // Create a new document in the database
//         const project = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//             title: formData.get("title"),
//             location: formData.get("location"),
//             area: formData.get("area"),
//             category: formData.get("category"),
//             clientName: formData.get("clientName"),
//             designerName: formData.get("designerName"),
//             completionDate: formData.get("completionDate"),
//             description: formData.get("description"),
//         })

//         // Upload project images
//         const imageFiles = formData.getAll("images") as File[]
//         const imagePromises = imageFiles.map((file) => storage.createFile(BUCKET_ID, ID.unique(), file))
//         const images = await Promise.all(imagePromises)

//         // Upload before and after images
//         const beforeImage = formData.get("beforeImage") as File
//         const afterImage = formData.get("afterImage") as File
//         const [beforeImageFile, afterImageFile] = await Promise.all([
//             storage.createFile(BUCKET_ID, ID.unique(), beforeImage),
//             storage.createFile(BUCKET_ID, ID.unique(), afterImage),
//         ])

//         // Update the document with image IDs
//         await databases.updateDocument(DATABASE_ID, COLLECTION_ID, project.$id, {
//             imageIds: images.map((img) => img.$id),
//             beforeImageId: beforeImageFile.$id,
//             afterImageId: afterImageFile.$id,
//         })

//         return { success: true, projectId: project.$id }
//     } catch (error) {
//         console.error("Error adding project:", error)
//         return { success: false, error: "Failed to add project" }
//     }
// }




"use server"

import { COLLECTION_ID, DATABASE_ID, BUCKET_ID, databases, storage } from "@/lib/appwrite"
import { ID } from "appwrite"
import { z } from "zod"

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
    area: z.string().min(1, "Area is required"),
    category: z.string().min(1, "Category is required"),
    clientName: z.string().min(1, "Client name is required"),
    designerName: z.string().min(1, "Designer name is required"),
    completionDate: z.string().min(1, "Completion date is required"),
    description: z.string().min(1, "Description is required"),
})

export type ProjectFormData = z.infer<typeof projectSchema>

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

export async function addProject(formData: ProjectFormData) {
    try {
        // Validate the form data
        const validatedData = projectSchema.parse(formData)

        // Create a new document in the database
        const project = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), validatedData)

        // Upload project images
        const imageFiles = formData.images as File[]
        const imagePromises = imageFiles.map((file) => storage.createFile(BUCKET_ID, ID.unique(), file))
        const images = await Promise.all(imagePromises)

        // Upload before and after images
        const beforeImage = formData.beforeImage as File
        const afterImage = formData.afterImage as File
        const [beforeImageFile, afterImageFile] = await Promise.all([
            storage.createFile(BUCKET_ID, ID.unique(), beforeImage),
            storage.createFile(BUCKET_ID, ID.unique(), afterImage),
        ])

        // Update the document with image IDs
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, project.$id, {
            imageIds: images.map((img) => img.$id),
            beforeImageId: beforeImageFile.$id,
            afterImageId: afterImageFile.$id,
        })

        return { success: true, projectId: project.$id }
    } catch (error) {
        console.error("Error adding project:", error)
        return { success: false, error: error instanceof z.ZodError ? error.errors : "Failed to add project" }
    }
}

