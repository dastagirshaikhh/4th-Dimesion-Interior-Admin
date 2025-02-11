import Link from "next/link"
import { checkAuth } from "@/app/actions/actions"
import ProjectList from "../../components/ProjectList"
import { Button } from "@/components/ui/button"
import { GetProjects } from "../actions/appwrite"
import { Project } from "@/lib/projects"

const mockProjects = [
    {
        $id: '1',
        title: 'Modern Minimalist Apartment',
        description:
            'A sleek and minimalist design for a city apartment, focusing on clean lines and functional spaces.',
        location: 'Lagos, Nigeria',
        area: '1200',
        category: 'Residential',
        completionDate: '2023-05-15',
        clientName: 'John & Sarah Thompson',
        designerName: 'Emma Rodriguez',
        images: [
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea',
        ],
        beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
        afterImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
        $createdAt: '2025-02-10T08:40:05.222+00:00',
        $updatedAt: '2025-02-10T08:40:05.222+00:00',
        $permissions: [],
        $databaseId: 'mockDB1',
        $collectionId: 'mockCollection1',
    },
    {
        $id: '2',
        title: 'Scandinavian Style House',
        description:
            'A cozy and warm Scandinavian-inspired house that maximizes comfort and natural lighting.',
        location: 'Oslo, Norway',
        area: '2000',
        category: 'Residential',
        completionDate: '2024-08-22',
        clientName: 'Lars & Ingrid Hansen',
        designerName: 'Freja Bjorn',
        images: [
            'https://images.unsplash.com/photo-1613977257363-5bfb6f9c5c3b',
            'https://images.unsplash.com/photo-1609948225541-bcba5a745d0a',
        ],
        beforeImage: 'https://images.unsplash.com/photo-1572021335318-50eb04a4f1c6',
        afterImage: 'https://images.unsplash.com/photo-1613977257363-5bfb6f9c5c3b',
        $createdAt: '2025-02-10T08:45:05.222+00:00',
        $updatedAt: '2025-02-10T08:45:05.222+00:00',
        $permissions: [],
        $databaseId: 'mockDB2',
        $collectionId: 'mockCollection2',
    },
    {
        $id: '3',
        title: 'Industrial Loft Renovation',
        description:
            'A bold industrial-style loft with exposed brick walls and steel elements, transforming an old warehouse into a modern home.',
        location: 'New York, USA',
        area: '1500',
        category: 'Commercial',
        completionDate: '2024-12-10',
        clientName: 'Michael & Lisa Green',
        designerName: 'Jacob Harris',
        images: [
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357',
            'https://images.unsplash.com/photo-1554995207-c18c203602cb',
        ],
        beforeImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        afterImage: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357',
        $createdAt: '2025-02-10T08:50:05.222+00:00',
        $updatedAt: '2025-02-10T08:50:05.222+00:00',
        $permissions: [],
        $databaseId: 'mockDB3',
        $collectionId: 'mockCollection3',
    },
];


export default async function DashboardPage() {
    checkAuth()
    const projects = await GetProjects();
    // console.log(projects?.documents)

    const projectList: Project[] = projects?.documents.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        description: doc.description,
        location: doc.location,
        area: doc.area,
        category: doc.category,
        completionDate: doc.completionDate,
        clientName: doc.clientName,
        designerName: doc.designerName,
        images: doc.images,
        beforeImage: doc.beforeImage,
        afterImage: doc.afterImage,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions,
        $databaseId: doc.$databaseId,
        $collectionId: doc.$collectionId,
    })) || [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-4">
                <Link href="/dashboard/new-project">
                    <Button>Add New Project</Button>
                </Link>
            </div>
            <ProjectList projects={projectList} />
        </div>
    )
}

