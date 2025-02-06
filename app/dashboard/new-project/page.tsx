import { checkAuth } from "@/app/actions/actions"
import ProjectForm from "../../components/ProjectForm"

export default function NewProjectPage() {
    checkAuth()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
            <ProjectForm />
        </div>
    )
}

