// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { format } from "date-fns";
// import { CalendarIcon, UploadCloud } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent } from "@/components/ui/card";
// import { addProject } from "@/app/actions/projects";

// export default function ProjectForm() {
//     const router = useRouter();
//     const [images, setImages] = useState<File[]>([]);
//     const [beforeImage, setBeforeImage] = useState<File | null>(null);
//     const [afterImage, setAfterImage] = useState<File | null>(null);
//     const [completionDate, setCompletionDate] = useState<Date>();

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
//         if (e.target.files?.length) {
//             setImage(e.target.files[0]);
//         }
//     };

//     const renderImagePreview = (image: File | null) =>
//         image ? <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-32 object-cover rounded-md shadow" /> : null;

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);

//         if (completionDate) {
//             formData.set("completionDate", format(completionDate, "yyyy-MM-dd"));
//         }

//         await addProject(formData);
//         router.push("/dashboard");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
//             {/* Project Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {["title", "location", "area", "category", "clientName", "designerName"].map((field) => (
//                     <div key={field} className="space-y-2">
//                         <Label htmlFor={field} className="capitalize">
//                             {field.replace(/([A-Z])/g, " $1")}
//                         </Label>
//                         <Input type="text" id={field} name={field} required />
//                     </div>
//                 ))}

//                 {/* Completion Date */}
//                 <div className="space-y-2">
//                     <Label htmlFor="completionDate">Completion Date</Label>
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 variant="outline"
//                                 className={`w-full justify-start text-left font-normal ${!completionDate && "text-muted-foreground"}`}
//                             >
//                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                 {completionDate ? format(completionDate, "PPP") : <span>Pick a date</span>}
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                             <Calendar mode="single" selected={completionDate} onSelect={setCompletionDate} initialFocus />
//                         </PopoverContent>
//                     </Popover>
//                 </div>
//             </div>

//             {/* Project Description */}
//             <div className="space-y-2">
//                 <Label htmlFor="description">Project Description</Label>
//                 <Textarea id="description" name="description" required className="min-h-[100px]" />
//             </div>

//             {/* Project Images Upload */}
//             <Card>
//                 <CardContent className="space-y-4 p-6">
//                     <Label className="text-lg font-semibold">Project Images (Max 5)</Label>
//                     <input
//                         type="file"
//                         id="images"
//                         accept="image/*"
//                         multiple
//                         hidden
//                         onChange={(e) => setImages(Array.from(e.target.files || []))}
//                     />
//                     <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("images")?.click()}>
//                         <UploadCloud className="w-5 h-5" /> Upload Project Images
//                     </Button>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
//                         {images.map((file, index) => (
//                             <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-md shadow" />
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Before & After Images */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Before Image */}
//                 <Card>
//                     <CardContent className="space-y-4 p-6">
//                         <Label className="text-lg font-semibold">Before Image</Label>
//                         <input
//                             type="file"
//                             id="beforeImage"
//                             accept="image/*"
//                             hidden
//                             onChange={(e) => handleFileChange(e, setBeforeImage)}
//                         />
//                         <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("beforeImage")?.click()}>
//                             <UploadCloud className="w-5 h-5" /> Upload Before Image
//                         </Button>
//                         {renderImagePreview(beforeImage)}
//                     </CardContent>
//                 </Card>

//                 {/* After Image */}
//                 <Card>
//                     <CardContent className="space-y-4 p-6">
//                         <Label className="text-lg font-semibold">After Image</Label>
//                         <input
//                             type="file"
//                             id="afterImage"
//                             accept="image/*"
//                             hidden
//                             onChange={(e) => handleFileChange(e, setAfterImage)}
//                         />
//                         <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("afterImage")?.click()}>
//                             <UploadCloud className="w-5 h-5" /> Upload After Image
//                         </Button>
//                         {renderImagePreview(afterImage)}
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="w-full">
//                 Add Project
//             </Button>
//         </form>
//     );
// }



"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { addProject, type ProjectFormData } from "@/app/actions/projects"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
// import { toast } from "react-hot-toast"

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
    area: z.string().min(1, "Area is required"),
    category: z.string().min(1, "Category is required"),
    clientName: z.string().min(1, "Client name is required"),
    designerName: z.string().min(1, "Designer name is required"),
    completionDate: z.date({
        required_error: "Completion date is required",
    }),
    description: z.string().min(1, "Description is required"),
    images: z.array(z.instanceof(File)).min(1, "At least one project image is required"),
    beforeImage: z.instanceof(File, { message: "Before image is required" }),
    afterImage: z.instanceof(File, { message: "After image is required" }),
})

export default function ProjectForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    })

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true)
        try {
            const result = await addProject(data)
            if (result.success) {
                console.log("Project added successfully!")
                router.push("/projects")
            } else {
                console.error(result.error as string)
            }
        } catch (error) {
            console.error("An error occurred while adding the project.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "images" | "beforeImage" | "afterImage") => {
        if (e.target.files?.length) {
            if (field === "images") {
                setValue(field, Array.from(e.target.files))
            } else {
                setValue(field, e.target.files[0])
            }
        }
    }

    const renderImagePreview = (image: File | null) =>
        image ? (
            <img
                src={URL.createObjectURL(image) || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md shadow"
            />
        ) : null

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["title", "location", "area", "category", "clientName", "designerName"].map((field) => (
                    <div key={field} className="space-y-2">
                        <Label htmlFor={field} className="capitalize">
                            {field.replace(/([A-Z])/g, " $1")}
                        </Label>
                        <Input
                            type="text"
                            id={field}
                            {...register(field as keyof ProjectFormData)}
                            className={errors[field as keyof ProjectFormData] ? "border-red-500" : ""}
                        />
                        {errors[field as keyof ProjectFormData] && (
                            <p className="text-red-500 text-sm">{errors[field as keyof ProjectFormData]?.message}</p>
                        )}
                    </div>
                ))}

                {/* Completion Date */}
                <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!watch("completionDate") && "text-muted-foreground"
                                    }`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {watch("completionDate") ? format(watch("completionDate"), "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={watch("completionDate")}
                                onSelect={(date) => setValue("completionDate", date as Date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.completionDate && <p className="text-red-500 text-sm">{errors.completionDate.message}</p>}
                </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                    id="description"
                    {...register("description")}
                    className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
                        onChange={(e) => handleFileChange(e, "images")}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center gap-2"
                        onClick={() => document.getElementById("images")?.click()}
                    >
                        <UploadCloud className="w-5 h-5" /> Upload Project Images
                    </Button>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {watch("images")?.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-24 object-cover rounded-md shadow"
                            />
                        ))}
                    </div>
                    {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
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
                            onChange={(e) => handleFileChange(e, "beforeImage")}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center gap-2"
                            onClick={() => document.getElementById("beforeImage")?.click()}
                        >
                            <UploadCloud className="w-5 h-5" /> Upload Before Image
                        </Button>
                        {renderImagePreview(watch("beforeImage"))}
                        {errors.beforeImage && <p className="text-red-500 text-sm">{errors.beforeImage.message}</p>}
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
                            onChange={(e) => handleFileChange(e, "afterImage")}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center gap-2"
                            onClick={() => document.getElementById("afterImage")?.click()}
                        >
                            <UploadCloud className="w-5 h-5" /> Upload After Image
                        </Button>
                        {renderImagePreview(watch("afterImage"))}
                        {errors.afterImage && <p className="text-red-500 text-sm">{errors.afterImage.message}</p>}
                    </CardContent>
                </Card>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Adding Project..." : "Add Project"}
            </Button>
        </form>
    )
}


