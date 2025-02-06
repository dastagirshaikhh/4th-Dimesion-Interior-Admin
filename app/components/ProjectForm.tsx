"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addProject } from "../actions/projects"

export default function ProjectForm() {
    const router = useRouter()
    const [images, setImages] = useState<File[]>([])
    const [beforeImage, setBeforeImage] = useState<File | null>(null)
    const [afterImage, setAfterImage] = useState<File | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        // In a real application, you would upload the images to a cloud storage service
        // and add their URLs to the formData

        await addProject(formData)
        router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Project Title
                </label>
                <Input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Project Description
                </label>
                <Textarea id="description" name="description" required />
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Project Location
                </label>
                <Input type="text" id="location" name="location" required />
            </div>
            <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Project Area
                </label>
                <Input type="text" id="area" name="area" required />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Project Category
                </label>
                <Input type="text" id="category" name="category" required />
            </div>
            <div>
                <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
                    Completion Date
                </label>
                <Input type="date" id="completionDate" name="completionDate" required />
            </div>
            <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                    Client Name
                </label>
                <Input type="text" id="clientName" name="clientName" required />
            </div>
            <div>
                <label htmlFor="designerName" className="block text-sm font-medium text-gray-700">
                    Designer Name
                </label>
                <Input type="text" id="designerName" name="designerName" required />
            </div>
            <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Project Images (5)
                </label>
                <Input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    required
                    onChange={(e) => setImages(Array.from(e.target.files || []))}
                />
            </div>
            <div>
                <label htmlFor="beforeImage" className="block text-sm font-medium text-gray-700">
                    Before Image
                </label>
                <Input
                    type="file"
                    id="beforeImage"
                    name="beforeImage"
                    accept="image/*"
                    required
                    onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
                />
            </div>
            <div>
                <label htmlFor="afterImage" className="block text-sm font-medium text-gray-700">
                    After Image
                </label>
                <Input
                    type="file"
                    id="afterImage"
                    name="afterImage"
                    accept="image/*"
                    required
                    onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
                />
            </div>
            <Button type="submit">Add Project</Button>
        </form>
    )
}

