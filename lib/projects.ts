export interface Project {
    $id: string;
    title: string;
    description: string;
    location: string;
    area: string;
    category: string;
    completionDate: string;
    clientName: string;
    designerName: string;
    images: string[];
    beforeImage: string;
    afterImage: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}


export interface AppwriteFormData {
    title: string;
    description: string;
    location: string;
    completionDate: string;
    area: string;
    client: string;
    designer: string;
    category: string;
    images: File[];
    beforeImage: File | null;
    afterImage: File | null;
}


export interface ProjectFormData {
    title: string
    description: string
    location: string
    completionDate: string
    area: string
    client: string
    designer: string
    category: string
    images: File[]
    beforeImage: File | null
    afterImage: File | null
}



export const extractFileId = (url: string): string => {
    const parts = url.split("/");
    const fileIndex = parts.indexOf("files");
    return fileIndex !== -1 && fileIndex + 1 < parts.length ? parts[fileIndex + 1] : "";
}