"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { addProject } from "../actions/projects";

export default function ProjectForm() {
    const router = useRouter();
    const [images, setImages] = useState<File[]>([]);
    const [beforeImage, setBeforeImage] = useState<File | null>(null);
    const [afterImage, setAfterImage] = useState<File | null>(null);
    const [completionDate, setCompletionDate] = useState<Date>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
        if (e.target.files?.length) {
            setImage(e.target.files[0]);
        }
    };

    const renderImagePreview = (image: File | null) =>
        image ? <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-32 object-cover rounded-md shadow" /> : null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (completionDate) {
            formData.set("completionDate", format(completionDate, "yyyy-MM-dd"));
        }

        await addProject(formData);
        router.push("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["title", "location", "area", "category", "clientName", "designerName"].map((field) => (
                    <div key={field} className="space-y-2">
                        <Label htmlFor={field} className="capitalize">
                            {field.replace(/([A-Z])/g, " $1")}
                        </Label>
                        <Input type="text" id={field} name={field} required />
                    </div>
                ))}

                {/* Completion Date */}
                <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
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
            </div>

            {/* Project Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" name="description" required className="min-h-[100px]" />
            </div>

            {/* Project Images Upload */}
            <Card>
                <CardContent className="space-y-4 p-6">
                    <Label className="text-lg font-semibold">Project Images (Max 5)</Label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => setImages(Array.from(e.target.files || []))}
                    />
                    <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("images")?.click()}>
                        <UploadCloud className="w-5 h-5" /> Upload Project Images
                    </Button>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {images.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-md shadow" />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Before & After Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Image */}
                <Card>
                    <CardContent className="space-y-4 p-6">
                        <Label className="text-lg font-semibold">Before Image</Label>
                        <input
                            type="file"
                            id="beforeImage"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleFileChange(e, setBeforeImage)}
                        />
                        <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("beforeImage")?.click()}>
                            <UploadCloud className="w-5 h-5" /> Upload Before Image
                        </Button>
                        {renderImagePreview(beforeImage)}
                    </CardContent>
                </Card>

                {/* After Image */}
                <Card>
                    <CardContent className="space-y-4 p-6">
                        <Label className="text-lg font-semibold">After Image</Label>
                        <input
                            type="file"
                            id="afterImage"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleFileChange(e, setAfterImage)}
                        />
                        <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("afterImage")?.click()}>
                            <UploadCloud className="w-5 h-5" /> Upload After Image
                        </Button>
                        {renderImagePreview(afterImage)}
                    </CardContent>
                </Card>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
                Add Project
            </Button>
        </form>
    );
}
