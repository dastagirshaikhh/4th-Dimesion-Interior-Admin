import Link from "next/link"
import { checkAuth } from "@/app/actions/actions"
import ProjectList from "../components/ProjectList"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    checkAuth()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-4">
                <Link href="/dashboard/new-project">
                    <Button>Add New Project</Button>
                </Link>
            </div>
            <ProjectList />
        </div>
    )
}

