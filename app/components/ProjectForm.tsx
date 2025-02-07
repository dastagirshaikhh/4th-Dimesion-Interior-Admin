"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { addProject } from "../actions/projects"

export default function ProjectForm() {
    const router = useRouter()
    const [images, setImages] = useState<File[]>([])
    const [beforeImage, setBeforeImage] = useState<File | null>(null)
    const [afterImage, setAfterImage] = useState<File | null>(null)
    const [completionDate, setCompletionDate] = useState<Date>()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        // Add the completion date to the form data
        if (completionDate) {
            formData.set("completionDate", format(completionDate, "yyyy-MM-dd"))
        }

        // In a real application, you would upload the images to a cloud storage service
        // and add their URLs to the formData

        await addProject(formData)
        router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input type="text" id="title" name="title" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Project Location</Label>
                    <Input type="text" id="location" name="location" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="area">Project Area</Label>
                    <Input type="text" id="area" name="area" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Project Category</Label>
                    <Input type="text" id="category" name="category" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!completionDate && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {completionDate ? format(completionDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={completionDate} onSelect={setCompletionDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input type="text" id="clientName" name="clientName" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="designerName">Designer Name</Label>
                    <Input type="text" id="designerName" name="designerName" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" name="description" required className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="images">Project Images (5)</Label>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="beforeImage">Before Image</Label>
                    <Input
                        type="file"
                        id="beforeImage"
                        name="beforeImage"
                        accept="image/*"
                        required
                        onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="afterImage">After Image</Label>
                    <Input
                        type="file"
                        id="afterImage"
                        name="afterImage"
                        accept="image/*"
                        required
                        onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
                    />
                </div>
            </div>
            <Button type="submit" className="w-full">
                Add Project
            </Button>
        </form>
    )
}

