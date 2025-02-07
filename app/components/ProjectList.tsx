"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { deleteProjects } from "../actions/projects"

// Mock project data
const mockProjects = [
    { id: 1, title: "Modern Living Room", date: "2023-06-01", image: "/placeholder.svg" },
    { id: 2, title: "Minimalist Kitchen", date: "2023-05-15", image: "/placeholder.svg" },
    { id: 3, title: "Cozy Bedroom", date: "2023-05-01", image: "/placeholder.svg" },
]

export default function ProjectList() {
    const [projects, setProjects] = useState(mockProjects)
    const [selectedProjects, setSelectedProjects] = useState<number[]>([])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProjects(projects.map((p) => p.id))
        } else {
            setSelectedProjects([])
        }
    }

    const handleSelectProject = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedProjects([...selectedProjects, id])
        } else {
            setSelectedProjects(selectedProjects.filter((p) => p !== id))
        }
    }

    const handleDeleteSelected = async () => {
        await deleteProjects(selectedProjects)
        setProjects(projects.filter((p) => !selectedProjects.includes(p.id)))
        setSelectedProjects([])
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Checkbox
                        id="select-all"
                        checked={selectedProjects.length === projects.length}
                        onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                    <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                        Select All
                    </label>
                </div>
                <Button onClick={handleDeleteSelected} disabled={selectedProjects.length === 0} variant="destructive">
                    Delete Selected
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-48">
                                <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
                                <div className="absolute top-2 left-2">
                                    <Checkbox
                                        id={`project-${project.id}`}
                                        checked={selectedProjects.includes(project.id)}
                                        onCheckedChange={(checked) => handleSelectProject(project.id, checked as boolean)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-500">{project.date}</p>
                            </div>
                            <Link href={`/dashboard/project/${project.id}`}>
                                <Button variant="outline" size="sm">
                                    View
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

