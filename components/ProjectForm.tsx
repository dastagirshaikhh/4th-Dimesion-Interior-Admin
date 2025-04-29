"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { createProjectDocument, ImageUpload } from "@/app/actions/appwrite"
import { Textarea } from "./ui/textarea"
import { ProjectFormData } from "@/lib/projects"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "./ui/toast"
import Link from "next/link"

const initialFormData: ProjectFormData = {
    title: "",
    description: "",
    location: "",
    completionDate: "",
    area: "",
    client: "",
    designer: "",
    category: "",
    images: [],
    beforeImage: null,
    afterImage: null,
}

const categories = [
    {
        id: "residential",
        label: "Residential",
    },
    {
        id: "commercial",
        label: "Commercial",
    }
]

export default function ProjectForm() {
    const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [beforeImage, setBeforeImage] = useState<File | null>(null)
    const [afterImage, setAfterImage] = useState<File | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("");
    const { toast } = useToast();

    const handleCategoryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSelectedCategory(event.target.value);
    };

    const handleBeforeImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setBeforeImage(event.target.files[0])
        }
    }

    const handleAfterImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAfterImage(event.target.files[0])
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)])
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!beforeImage || !afterImage) {
                throw new Error("Both before and after images must be selected.")
            }

            // Upload images
            const imageIds = await Promise.all(images.map((image) => ImageUpload(image)))
            const beforeImageId = await ImageUpload(beforeImage)
            const afterImageId = await ImageUpload(afterImage)

            await createProjectDocument(formData, imageIds, beforeImageId, afterImageId, selectedCategory);

            setFormData(initialFormData)
            setImages([])
            setBeforeImage(null)
            setAfterImage(null)
            // alert("Project added successfully!")
            toast({
                description: "Your project has been added successfully!",
                action: <ToastAction altText="Go to Dashboard"><Link href="/dashboard">Go to Dashboard</Link></ToastAction>
            });
        } catch (error) {
            console.error("Error adding project:", error)
            toast({
                title: "Something went wrong:( ☹️",
                description: "Error adding project. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 space-y-6">

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Title
                        </Label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Completion Date
                            </Label>
                            <Input
                                type="date"
                                name="completionDate"
                                value={formData.completionDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Area (sqft)
                            </Label>
                            <Input
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Client Name
                            </Label>
                            <Input
                                type="text"
                                name="client"
                                value={formData.client}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Designer
                            </Label>
                            <Input
                                type="text"
                                name="designer"
                                value={formData.designer}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Type
                            </Label>
                            <div className="flex gap-4">
                                {categories.map((item) => (
                                    <Label key={item.id} className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="category"
                                            value={item.id}
                                            checked={selectedCategory === item.id}
                                            onChange={handleCategoryChange}
                                            className="form-radio text-black"
                                        />
                                        <span>{item.label}</span>
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Project Images
                        </Label>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Label
                                htmlFor="add-images"
                                className="border-2 border-dashed border-gray-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors w-full"
                            >
                                <Input
                                    id="add-images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <Plus className="w-8 h-8 text-gray-400" />
                                <span className="text-sm text-gray-500 mt-2">Add Image</span>
                            </Label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="beforeImage" className="block text-sm font-medium text-gray-700 mb-2">
                                Before Image
                            </Label>
                            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                                {beforeImage ? (
                                    <Image
                                        src={URL.createObjectURL(beforeImage) || "/placeholder.svg"}
                                        alt="Before"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Label
                                        htmlFor="beforeImage"
                                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                                    >
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-2">Upload Before Image</span>
                                    </Label>
                                )}
                                <Input
                                    id="beforeImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBeforeImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="afterImage" className="block text-sm font-medium text-gray-700 mb-2">
                                After Image
                            </Label>
                            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                                {afterImage ? (
                                    <Image
                                        src={URL.createObjectURL(afterImage) || "/placeholder.svg"}
                                        alt="After"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Label
                                        htmlFor="afterImage"
                                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                                    >
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-2">Upload After Image</span>
                                    </Label>
                                )}
                                <Input
                                    id="afterImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAfterImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Adding Project...
                        </>
                    ) : (
                        "Add Project"
                    )}
                </Button>
            </form>
        </div>
    )
}
