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