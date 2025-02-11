// import Image from "next/image"
// // import { getProject } from "../../../actions/projects"
// import { checkAuth } from "@/app/actions/actions"
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { HomeIcon } from "lucide-react";
// import { GetProductById } from "@/app/actions/appwrite";
// import { Project } from "@/lib/projects";

// export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
//     const params = await props.params;
//     checkAuth()
//     const project = await GetProductById(params.id)

//     const projectDetail: Project[] = project?.documents.map((doc) => ({
//             $id: doc.$id,
//             title: doc.title,
//             description: doc.description,
//             location: doc.location,
//             area: doc.area,
//             category: doc.category,
//             completionDate: doc.completionDate,
//             clientName: doc.clientName,
//             designerName: doc.designerName,
//             images: doc.images,
//             beforeImage: doc.beforeImage,
//             afterImage: doc.afterImage,
//             $createdAt: doc.$createdAt,
//             $updatedAt: doc.$updatedAt,
//             $permissions: doc.$permissions,
//             $databaseId: doc.$databaseId,
//             $collectionId: doc.$collectionId,
//         })) || [];

//     return (
//         // <div className="container mx-auto p-4">
//         //     <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
//         //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         //         <div>
//         //             <p>
//         //                 <strong>Description:</strong> {project.description}
//         //             </p>
//         //             <p>
//         //                 <strong>Location:</strong> {project.location}
//         //             </p>
//         //             <p>
//         //                 <strong>Area:</strong> {project.area}
//         //             </p>
//         //             <p>
//         //                 <strong>Category:</strong> {project.category}
//         //             </p>
//         //             <p>
//         //                 <strong>Completion Date:</strong> {project.completionDate}
//         //             </p>
//         //             <p>
//         //                 <strong>Client:</strong> {project.clientName}
//         //             </p>
//         //             <p>
//         //                 <strong>Designer:</strong> {project.designerName}
//         //             </p>
//         //         </div>
//         //         <div>
//         //             <h2 className="text-xl font-bold mb-2">Project Images</h2>
//         //             <div className="grid grid-cols-2 gap-2">
//         //                 {project.images.map((src, index) => (
//         //                     <Image
//         //                         key={index}
//         //                         src={src || "/placeholder.svg"}
//         //                         alt={`Project image ${index + 1}`}
//         //                         width={200}
//         //                         height={200}
//         //                         className="object-cover"
//         //                     />
//         //                 ))}
//         //             </div>
//         //             <h2 className="text-xl font-bold mt-4 mb-2">Before & After</h2>
//         //             <div className="grid grid-cols-2 gap-2">
//         //                 <Image
//         //                     src={project.beforeImage || "/placeholder.svg"}
//         //                     alt="Before"
//         //                     width={200}
//         //                     height={200}
//         //                     className="object-cover"
//         //                 />
//         //                 <Image
//         //                     src={project.afterImage || "/placeholder.svg"}
//         //                     alt="After"
//         //                     width={200}
//         //                     height={200}
//         //                     className="object-cover"
//         //                 />
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>

//         <div className="container mx-auto p-6">
//             <div className="text-2xl flex w-full items-center justify-between">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//                     {project.title}
//                 </h1>
//                 <div className="flex items-center gap-4">
//                     <Button variant="outline" className="flex items-center gap-2" asChild>
//                         <Link href="/dashboard">
//                             <HomeIcon className="w-5 h-5" /> Home
//                         </Link>
//                     </Button>
//                     <Button asChild>
//                         <Link href="/dashboard/new-project">
//                             Add New Project
//                         </Link>
//                     </Button>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Project Details */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Information</h2>
//                     <p className="mb-2"><strong>Description:</strong> {project.description}</p>
//                     <p className="mb-2"><strong>Location:</strong> {project.location}</p>
//                     <p className="mb-2"><strong>Area:</strong> {project.area}</p>
//                     <p className="mb-2"><strong>Category:</strong> {project.category}</p>
//                     <p className="mb-2"><strong>Completion Date:</strong> {project.completionDate}</p>
//                     <p className="mb-2"><strong>Client:</strong> {project.clientName}</p>
//                     <p className="mb-2"><strong>Designer:</strong> {project.designerName}</p>
//                 </div>

//                 {/* Project Images */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Images</h2>
//                     <div className="grid grid-cols-2 gap-3">
//                         {project.images.map((src, index) => (
//                             <Image
//                                 key={index}
//                                 src={src || "/placeholder.svg"}
//                                 alt={`Project image ${index + 1}`}
//                                 width={250}
//                                 height={250}
//                                 className="object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Before & After Section */}
//             <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Before & After</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {["Before", "After"].map((label, index) => (
//                         <div key={label} className="text-center">
//                             <h3 className="text-lg font-semibold text-gray-700 mb-3">{label}</h3>
//                             <Image
//                                 src={index === 0 ? project.beforeImage || "/placeholder.svg" : project.afterImage || "/placeholder.svg"}
//                                 alt={`${label} view of ${project.title || "project"}`}
//                                 width={300}
//                                 height={300}
//                                 className="object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out aspect-square"
//                             />
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     )
// }


import Image from "next/image";
import { checkAuth } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { GetProductById } from "@/app/actions/appwrite";
import { Project } from "@/lib/projects";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = await params; // Extract `id` correctly
    checkAuth();

    const project = await GetProductById(id);

    if (!project) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h2 className="text-2xl font-semibold text-red-600">Project not found</h2>
                <Button variant="outline" className="mt-4">
                    <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="text-2xl flex w-full items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {project.title}
                </h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                        <Link href="/dashboard">
                            <HomeIcon className="w-5 h-5" /> Home
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/new-project">Add New Project</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Information</h2>
                    <p className="mb-2"><strong>Description:</strong> {project.description}</p>
                    <p className="mb-2"><strong>Location:</strong> {project.location}</p>
                    <p className="mb-2"><strong>Area:</strong> {project.area}</p>
                    <p className="mb-2"><strong>Category:</strong> {project.category}</p>
                    <p className="mb-2"><strong>Completion Date:</strong> {project.completionDate}</p>
                    <p className="mb-2"><strong>Client:</strong> {project.clientName}</p>
                    <p className="mb-2"><strong>Designer:</strong> {project.designerName}</p>
                </div>

                {/* Project Images */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Images</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {project.images?.length > 0 ? (
                            project.images.map((src: string, index: number) => (
                                <Image
                                    key={index}
                                    src={src || "/placeholder.svg"}
                                    alt={`Project image ${index + 1}`}
                                    width={250}
                                    height={250}
                                    className="object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                />
                            ))
                        ) : (
                            <p>No images available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Before & After Section */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Before & After</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Before", "After"].map((label, index) => (
                        <div key={label} className="text-center">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">{label}</h3>
                            <Image
                                src={index === 0 ? project.beforeImage || "/placeholder.svg" : project.afterImage || "/placeholder.svg"}
                                alt={`${label} view of ${project.title || "project"}`}
                                width={300}
                                height={300}
                                className="object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out aspect-square"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ✅ FIXED FUNCTION: GetProductById