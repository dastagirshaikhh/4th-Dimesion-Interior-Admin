"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { deleteProjects } from "../actions/projects"

// Mock project data
const mockProjects = [
    { id: 1, title: "Modern Living Room", date: "2023-06-01" },
    { id: 2, title: "Minimalist Kitchen", date: "2023-05-15" },
    { id: 3, title: "Cozy Bedroom", date: "2023-05-01" },
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
            <div className="mb-4 flex items-center">
                <Checkbox
                    id="select-all"
                    checked={selectedProjects.length === projects.length}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <label htmlFor="select-all" className="ml-2">
                    Select All
                </label>
                <Button onClick={handleDeleteSelected} disabled={selectedProjects.length === 0} className="ml-4">
                    Delete Selected
                </Button>
            </div>
            <ul className="space-y-2">
                {projects.map((project) => (
                    <li key={project.id} className="flex items-center space-x-2 p-2 border rounded">
                        <Checkbox
                            id={`project-${project.id}`}
                            checked={selectedProjects.includes(project.id)}
                            onCheckedChange={(checked) => handleSelectProject(project.id, checked as boolean)}
                        />
                        <Link href={`/dashboard/project/${project.id}`} className="flex-grow">
                            {project.title} - {project.date}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

