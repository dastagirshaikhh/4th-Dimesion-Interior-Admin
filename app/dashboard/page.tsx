import Link from "next/link"
import { checkAuth } from "@/app/actions/actions"
import ProjectList from "../../components/ProjectList"
import { Button } from "@/components/ui/button"
import { GetProjects } from "../actions/appwrite"
import { Project } from "@/lib/projects"
import LogoutButton from "@/components/LogoutButton"


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
            <div className="mb-4 w-full flex justify-between items-center">
                <Link href="/dashboard/new-project">
                    <Button>Add New Project</Button>
                </Link>
                <LogoutButton />
            </div>
            <ProjectList projects={projectList} />
        </div>
    )
}

