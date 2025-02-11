"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Project } from "@/lib/projects";
import { deleteProjects } from "../app/actions/appwrite";

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
