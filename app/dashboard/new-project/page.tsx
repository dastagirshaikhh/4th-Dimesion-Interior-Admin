import { checkAuth } from "@/app/actions/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import ProjectForm from "@/components/ProjectForm"

export default function NewProjectPage() {
    checkAuth()

    return (
        <div className="container mx-auto p-4">
            <Card>
                {/* <CardHeader>
                    <CardTitle className="text-2xl">Add New Project</CardTitle>
                    <Button asChild>
                        <Link href="/dashboard">
                            <HomeIcon /> Home
                        </Link>
                    </Button>

                </CardHeader> */}
                <CardHeader>
                    <CardTitle className="text-2xl flex w-full items-center justify-between">Add New Project 
                    <Button variant="outline" asChild className="flex items-center gap-2">
                        <Link href="/dashboard">
                            <HomeIcon className="w-5 h-5" /> Home
                        </Link>
                    </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <ProjectForm />
                </CardContent>
            </Card>
        </div>
    )
}

