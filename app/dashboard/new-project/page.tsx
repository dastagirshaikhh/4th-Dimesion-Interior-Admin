// import { checkAuth } from "../../actions/auth"
import { checkAuth } from "@/app/actions/actions"
import ProjectForm from "../../components/ProjectForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProjectPage() {
    checkAuth()

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProjectForm />
                </CardContent>
            </Card>
        </div>
    )
}

