// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { deleteProjects } from "../actions/projects"

// const mockProjects = [
//     { id: 1, title: "Modern Living Room", date: "2023-06-01", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
//     { id: 2, title: "Minimalist Kitchen", date: "2023-05-15", image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" },
//     { id: 3, title: "Cozy Bedroom", date: "2023-05-01", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" },
// ]

// export default function ProjectList() {
//     const [projects, setProjects] = useState(mockProjects)
//     const [selectedProjects, setSelectedProjects] = useState<number[]>([])

//     const handleSelectAll = (checked: boolean) => {
//         if (checked) {
//             setSelectedProjects(projects.map((p) => p.id))
//         } else {
//             setSelectedProjects([])
//         }
//     }

//     const handleSelectProject = (id: number, checked: boolean) => {
//         if (checked) {
//             setSelectedProjects([...selectedProjects, id])
//         } else {
//             setSelectedProjects(selectedProjects.filter((p) => p !== id))
//         }
//     }

// const handleDeleteSelected = async () => {
//     await deleteProjects(selectedProjects)
//     setProjects(projects.filter((p) => !selectedProjects.includes(p.id)))
//     setSelectedProjects([])
// }

//     return (
//         <div>
//             <div className="mb-4 flex items-center justify-between">
//                 <div className="flex items-center">
//                     <Checkbox
//                         id="select-all"
//                         checked={selectedProjects.length === projects.length}
//                         onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
//                     />
//                     <label htmlFor="select-all" className="ml-2 text-sm font-medium">
//                         Select All
//                     </label>
//                 </div>
// <Button onClick={handleDeleteSelected} disabled={selectedProjects.length === 0} variant="destructive">
//     Delete Selected
// </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {projects.map((project) => (
//                     <Card key={project.id} className="overflow-hidden">
//                         <CardContent className="p-0">
//                             <div className="relative h-48">
//                                 <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
//                                 <div className="absolute top-2 left-2">
//                                     <Checkbox
//                                         id={`project-${project.id}`}
//                                         checked={selectedProjects.includes(project.id)}
//                                         onCheckedChange={(checked) => handleSelectProject(project.id, checked as boolean)}
//                                     />
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter className="flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-semibold">{project.title}</h3>
//                                 <p className="text-sm text-gray-500">{project.date}</p>
//                             </div>
//                             <Link href={`/dashboard/project/${project.id}`}>
//                                 <Button variant="outline" size="sm">
//                                     View
//                                 </Button>
//                             </Link>
//                         </CardFooter>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     )
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Project } from "@/lib/projects";
import { deleteProjects } from "../actions/appwrite";

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [projectList, setProjectList] = useState<Project[]>(projects)

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProjects(projects.map((p) => p.$id));
        } else {
            setSelectedProjects([]);
        }
    };

    const handleSelectProject = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedProjects([...selectedProjects, id]);
        } else {
            setSelectedProjects(selectedProjects.filter((p) => p !== id));
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedProjects.length === 0) return;

        try {
            await deleteProjects(selectedProjects);
            setProjectList(projectList.filter((p) => !selectedProjects.includes(p.$id)));
            setSelectedProjects([]);
        } catch (error) {
            console.error("Error deleting projects:", error);
        }
    };


    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Checkbox
                        id="select-all"
                        checked={selectedProjects.length === projects.length}
                        onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                    <Label htmlFor="select-all" className="ml-2 text-sm font-medium">
                        Select All
                    </Label>
                </div>
                <Button onClick={handleDeleteSelected} disabled={selectedProjects.length === 0} variant="destructive">
                    Delete Selected
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Card key={project.$id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-48">
                                <Image src={project.images[0] || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
                                <div className="absolute top-2 left-2">
                                    <Checkbox
                                        id={`project-${project.$id}`}
                                        checked={selectedProjects.includes(project.$id)}
                                        onCheckedChange={(checked) => handleSelectProject(project.$id, checked as boolean)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-500">{project.completionDate}</p>
                            </div>
                            <Link href={`/dashboard/project/${project.$id}`}>
                                <Button variant="outline" size="sm">
                                    View
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
