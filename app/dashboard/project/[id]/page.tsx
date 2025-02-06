import Image from "next/image"
import { getProject } from "../../../actions/projects"
// import { checkAuth } from "../../../actions/auth"
import { checkAuth } from "@/app/actions/actions"

export default async function ProjectPage({ params }: { params: { id: string } }) {
    checkAuth()
    const project = await getProject(params.id)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p>
                        <strong>Description:</strong> {project.description}
                    </p>
                    <p>
                        <strong>Location:</strong> {project.location}
                    </p>
                    <p>
                        <strong>Area:</strong> {project.area}
                    </p>
                    <p>
                        <strong>Category:</strong> {project.category}
                    </p>
                    <p>
                        <strong>Completion Date:</strong> {project.completionDate}
                    </p>
                    <p>
                        <strong>Client:</strong> {project.clientName}
                    </p>
                    <p>
                        <strong>Designer:</strong> {project.designerName}
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Project Images</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {project.images.map((src, index) => (
                            <Image
                                key={index}
                                src={src || "/placeholder.svg"}
                                alt={`Project image ${index + 1}`}
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        ))}
                    </div>
                    <h2 className="text-xl font-bold mt-4 mb-2">Before & After</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <Image
                            src={project.beforeImage || "/placeholder.svg"}
                            alt="Before"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                        <Image
                            src={project.afterImage || "/placeholder.svg"}
                            alt="After"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

