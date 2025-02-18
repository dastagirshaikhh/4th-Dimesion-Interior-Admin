// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { format } from "date-fns";
// // // import { CalendarIcon, UploadCloud } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/Input";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Label } from "@/components/ui/Label";
// // // import { Calendar } from "@/components/ui/calendar";
// // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { addProject } from "@/app/actions/projects";

// // // export default function ProjectForm() {
// // //     const router = useRouter();
// // //     const [images, setImages] = useState<File[]>([]);
// // //     const [beforeImage, setBeforeImage] = useState<File | null>(null);
// // //     const [afterImage, setAfterImage] = useState<File | null>(null);
// // //     const [completionDate, setCompletionDate] = useState<Date>();

// // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
// // //         if (e.target.files?.length) {
// // //             setImage(e.target.files[0]);
// // //         }
// // //     };

// // //     const renderImagePreview = (image: File | null) =>
// // //         image ? <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-32 object-cover rounded-md shadow" /> : null;

// // //     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// // //         event.preventDefault();
// // //         const formData = new FormData(event.currentTarget);

// // //         if (completionDate) {
// // //             formData.set("completionDate", format(completionDate, "yyyy-MM-dd"));
// // //         }

// // //         await addProject(formData);
// // //         router.push("/dashboard");
// // //     };

// // //     return (
// // //         <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
// // //             {/* Project Details */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 {["title", "location", "area", "category", "clientName", "designerName"].map((field) => (
// // //                     <div key={field} className="space-y-2">
// // //                         <Label htmlFor={field} className="capitalize">
// // //                             {field.replace(/([A-Z])/g, " $1")}
// // //                         </Label>
// // //                         <Input type="text" id={field} name={field} required />
// // //                     </div>
// // //                 ))}

// // //                 {/* Completion Date */}
// // //                 <div className="space-y-2">
// // //                     <Label htmlFor="completionDate">Completion Date</Label>
// // //                     <Popover>
// // //                         <PopoverTrigger asChild>
// // //                             <Button
// // //                                 variant="outline"
// // //                                 className={`w-full justify-start text-left font-normal ${!completionDate && "text-muted-foreground"}`}
// // //                             >
// // //                                 <CalendarIcon className="mr-2 h-4 w-4" />
// // //                                 {completionDate ? format(completionDate, "PPP") : <span>Pick a date</span>}
// // //                             </Button>
// // //                         </PopoverTrigger>
// // //                         <PopoverContent className="w-auto p-0">
// // //                             <Calendar mode="single" selected={completionDate} onSelect={setCompletionDate} initialFocus />
// // //                         </PopoverContent>
// // //                     </Popover>
// // //                 </div>
// // //             </div>

// // //             {/* Project Description */}
// // //             <div className="space-y-2">
// // //                 <Label htmlFor="description">Project Description</Label>
// // //                 <Textarea id="description" name="description" required className="min-h-[100px]" />
// // //             </div>

// // //             {/* Project Images Upload */}
// // //             <Card>
// // //                 <CardContent className="space-y-4 p-6">
// // //                     <Label className="text-lg font-semibold">Project Images (Max 5)</Label>
// // //                     <Input
// // //                         type="file"
// // //                         id="images"
// // //                         accept="image/*"
// // //                         multiple
// // //                         hidden
// // //                         onChange={(e) => setImages(Array.from(e.target.files || []))}
// // //                     />
// // //                     <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("images")?.click()}>
// // //                         <UploadCloud className="w-5 h-5" /> Upload Project Images
// // //                     </Button>
// // //                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
// // //                         {images.map((file, index) => (
// // //                             <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-md shadow" />
// // //                         ))}
// // //                     </div>
// // //                 </CardContent>
// // //             </Card>

// // //             {/* Before & After Images */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {/* Before Image */}
// // //                 <Card>
// // //                     <CardContent className="space-y-4 p-6">
// // //                         <Label className="text-lg font-semibold">Before Image</Label>
// // //                         <Input
// // //                             type="file"
// // //                             id="beforeImage"
// // //                             accept="image/*"
// // //                             hidden
// // //                             onChange={(e) => handleFileChange(e, setBeforeImage)}
// // //                         />
// // //                         <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("beforeImage")?.click()}>
// // //                             <UploadCloud className="w-5 h-5" /> Upload Before Image
// // //                         </Button>
// // //                         {renderImagePreview(beforeImage)}
// // //                     </CardContent>
// // //                 </Card>

// // //                 {/* After Image */}
// // //                 <Card>
// // //                     <CardContent className="space-y-4 p-6">
// // //                         <Label className="text-lg font-semibold">After Image</Label>
// // //                         <Input
// // //                             type="file"
// // //                             id="afterImage"
// // //                             accept="image/*"
// // //                             hidden
// // //                             onChange={(e) => handleFileChange(e, setAfterImage)}
// // //                         />
// // //                         <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => document.getElementById("afterImage")?.click()}>
// // //                             <UploadCloud className="w-5 h-5" /> Upload After Image
// // //                         </Button>
// // //                         {renderImagePreview(afterImage)}
// // //                     </CardContent>
// // //                 </Card>
// // //             </div>

// // //             {/* Submit Button */}
// // //             <Button type="submit" className="w-full">
// // //                 Add Project
// // //             </Button>
// // //         </form>
// // //     );
// // // }



// // // "use client"

// // // import { useState } from "react"
// // // import { useRouter } from "next/navigation"
// // // import { format } from "date-fns"
// // // import { CalendarIcon, UploadCloud } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/Input"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Label } from "@/components/ui/Label"
// // // import { Calendar } from "@/components/ui/calendar"
// // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// // // import { Card, CardContent } from "@/components/ui/card"
// // // import { addProject, type ProjectFormData } from "@/app/actions/projects"
// // // import { z } from "zod"
// // // import { useForm } from "react-hook-form"
// // // import { zodResolver } from "@hookform/resolvers/zod"
// // // import { toast } from "@/hooks/use-toast"
// // // // import { toast } from "react-hot-toast"

// // // const projectSchema = z.object({
// // //     title: z.string().min(1, "Title is required"),
// // //     location: z.string().min(1, "Location is required"),
// // //     area: z.string().min(1, "Area is required"),
// // //     category: z.string().min(1, "Category is required"),
// // //     clientName: z.string().min(1, "Client name is required"),
// // //     designerName: z.string().min(1, "Designer name is required"),
// // //     completionDate: z.date({
// // //         required_error: "Completion date is required",
// // //     }),
// // //     description: z.string().min(1, "Description is required"),
// // //     images: z.array(z.instanceof(File)).min(1, "At least one project image is required"),
// // //     beforeImage: z.instanceof(File, { message: "Before image is required" }),
// // //     afterImage: z.instanceof(File, { message: "After image is required" }),
// // // })

// // // export default function ProjectForm() {
// // //     const router = useRouter()
// // //     const [isLoading, setIsLoading] = useState(false)
// // //     const {
// // //         register,
// // //         handleSubmit,
// // //         setValue,
// // //         watch,
// // //         formState: { errors },
// // //     } = useForm<ProjectFormData>({
// // //         resolver: zodResolver(projectSchema),
// // //     })

// // //     const onSubmit = async (data: ProjectFormData) => {
// // //         setIsLoading(true)
// // //         try {
// // //             const result = await addProject(data)
// // //             if (result.success) {
// // //                 console.log("Project added successfully!")
// // //                 router.push("/projects")
// // //             } else {
// // //                 console.error(result.error as string)
// // //             }
// // //         } catch (error) {
// // //             console.error("An error occurred while adding the project.")
// // //         } finally {
// // //             setIsLoading(false)
// // //         }
// // //     }

// // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "images" | "beforeImage" | "afterImage") => {
// // //         if (e.target.files?.length) {
// // //             if (field === "images") {
// // //                 setValue(field, Array.from(e.target.files))
// // //             } else {
// // //                 setValue(field, e.target.files[0])
// // //             }
// // //         }
// // //     }

// // //     const renderImagePreview = (image: File | null) =>
// // //         image ? (
// // //             <img
// // //                 src={URL.createObjectURL(image) || "/placeholder.svg"}
// // //                 alt="Preview"
// // //                 className="w-full h-32 object-cover rounded-md shadow"
// // //             />
// // //         ) : null

// // //     return (
// // //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
// // //             {/* Project Details */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 {["title", "location", "area", "category", "clientName", "designerName"].map((field) => (
// // //                     <div key={field} className="space-y-2">
// // //                         <Label htmlFor={field} className="capitalize">
// // //                             {field.replace(/([A-Z])/g, " $1")}
// // //                         </Label>
// // //                         <Input
// // //                             type="text"
// // //                             id={field}
// // //                             {...register(field as keyof ProjectFormData)}
// // //                             className={errors[field as keyof ProjectFormData] ? "border-red-500" : ""}
// // //                         />
// // //                         {errors[field as keyof ProjectFormData] && (
// // //                             <p className="text-red-500 text-sm">{errors[field as keyof ProjectFormData]?.message}</p>
// // //                         )}
// // //                     </div>
// // //                 ))}

// // //                 {/* Completion Date */}
// // //                 <div className="space-y-2">
// // //                     <Label htmlFor="completionDate">Completion Date</Label>
// // //                     <Popover>
// // //                         <PopoverTrigger asChild>
// // //                             <Button
// // //                                 variant="outline"
// // //                                 className={`w-full justify-start text-left font-normal ${!watch("completionDate") && "text-muted-foreground"
// // //                                     }`}
// // //                             >
// // //                                 <CalendarIcon className="mr-2 h-4 w-4" />
// // //                                 {watch("completionDate") ? format(watch("completionDate"), "PPP") : <span>Pick a date</span>}
// // //                             </Button>
// // //                         </PopoverTrigger>
// // //                         <PopoverContent className="w-auto p-0">
// // //                             <Calendar
// // //                                 mode="single"
// // //                                 selected={watch("completionDate")}
// // //                                 onSelect={(date) => setValue("completionDate", date as Date)}
// // //                                 initialFocus
// // //                             />
// // //                         </PopoverContent>
// // //                     </Popover>
// // //                     {errors.completionDate && <p className="text-red-500 text-sm">{errors.completionDate.message}</p>}
// // //                 </div>
// // //             </div>

// // //             {/* Project Description */}
// // //             <div className="space-y-2">
// // //                 <Label htmlFor="description">Project Description</Label>
// // //                 <Textarea
// // //                     id="description"
// // //                     {...register("description")}
// // //                     className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
// // //                 />
// // //                 {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
// // //             </div>

// // //             {/* Project Images Upload */}
// // //             <Card>
// // //                 <CardContent className="space-y-4 p-6">
// // //                     <Label className="text-lg font-semibold">Project Images (Max 5)</Label>
// // //                     <Input
// // //                         type="file"
// // //                         id="images"
// // //                         accept="image/*"
// // //                         multiple
// // //                         hidden
// // //                         onChange={(e) => handleFileChange(e, "images")}
// // //                     />
// // //                     <Button
// // //                         type="button"
// // //                         variant="outline"
// // //                         className="w-full flex items-center gap-2"
// // //                         onClick={() => document.getElementById("images")?.click()}
// // //                     >
// // //                         <UploadCloud className="w-5 h-5" /> Upload Project Images
// // //                     </Button>
// // //                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
// // //                         {watch("images")?.map((file, index) => (
// // //                             <img
// // //                                 key={index}
// // //                                 src={URL.createObjectURL(file) || "/placeholder.svg"}
// // //                                 alt="Preview"
// // //                                 className="w-full h-24 object-cover rounded-md shadow"
// // //                             />
// // //                         ))}
// // //                     </div>
// // //                     {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
// // //                 </CardContent>
// // //             </Card>

// // //             {/* Before & After Images */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {/* Before Image */}
// // //                 <Card>
// // //                     <CardContent className="space-y-4 p-6">
// // //                         <Label className="text-lg font-semibold">Before Image</Label>
// // //                         <Input
// // //                             type="file"
// // //                             id="beforeImage"
// // //                             accept="image/*"
// // //                             hidden
// // //                             onChange={(e) => handleFileChange(e, "beforeImage")}
// // //                         />
// // //                         <Button
// // //                             type="button"
// // //                             variant="outline"
// // //                             className="w-full flex items-center gap-2"
// // //                             onClick={() => document.getElementById("beforeImage")?.click()}
// // //                         >
// // //                             <UploadCloud className="w-5 h-5" /> Upload Before Image
// // //                         </Button>
// // //                         {renderImagePreview(watch("beforeImage"))}
// // //                         {errors.beforeImage && <p className="text-red-500 text-sm">{errors.beforeImage.message}</p>}
// // //                     </CardContent>
// // //                 </Card>

// // //                 {/* After Image */}
// // //                 <Card>
// // //                     <CardContent className="space-y-4 p-6">
// // //                         <Label className="text-lg font-semibold">After Image</Label>
// // //                         <Input
// // //                             type="file"
// // //                             id="afterImage"
// // //                             accept="image/*"
// // //                             hidden
// // //                             onChange={(e) => handleFileChange(e, "afterImage")}
// // //                         />
// // //                         <Button
// // //                             type="button"
// // //                             variant="outline"
// // //                             className="w-full flex items-center gap-2"
// // //                             onClick={() => document.getElementById("afterImage")?.click()}
// // //                         >
// // //                             <UploadCloud className="w-5 h-5" /> Upload After Image
// // //                         </Button>
// // //                         {renderImagePreview(watch("afterImage"))}
// // //                         {errors.afterImage && <p className="text-red-500 text-sm">{errors.afterImage.message}</p>}
// // //                     </CardContent>
// // //                 </Card>
// // //             </div>

// // //             {/* Submit Button */}
// // //             <Button type="submit" className="w-full" disabled={isLoading}>
// // //                 {isLoading ? "Adding Project..." : "Add Project"}
// // //             </Button>
// // //         </form>
// // //     )
// // // }

// // "use client"
// // import React, { useState } from 'react';
// // import { Upload, X, Plus, Loader2 } from 'lucide-react';
// // import { Input } from './ui/Input';
// // import { Button } from './ui/button';
// // import { Label } from './ui/Label';
// // import { Textarea } from './ui/textarea';
// // import { ImageUpload } from '@/app/actions/appwrite';
// // import { COLLECTION_ID, DATABASE_ID, databases } from '@/lib/appwrite';
// // import { ID } from 'appwrite';

// // interface FormData {
// //     title: string;
// //     description: string;
// //     location: string;
// //     completionDate: string;
// //     area: string;
// //     client: string;
// //     designer: string;
// //     images: string[];
// //     beforeImage: string;
// //     afterImage: string;
// // }

// // const initialFormData: FormData = {
// //     title: '',
// //     description: '',
// //     location: '',
// //     completionDate: '',
// //     area: '',
// //     client: '',
// //     designer: '',
// //     images: [],
// //     beforeImage: '',
// //     afterImage: ''
// // };

// // export default function AddProduct() {
// //     const [formData, setFormData] = useState<FormData>(initialFormData);
// //     const [loading, setLoading] = useState(false);
// //     const [previewImages, setPreviewImages] = useState<string[]>([]);

// //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: value
// //         }));
// //     };

// //     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'before' | 'after') => {
// //         const files = e.target.files;
// //         if (!files) return;

// //         // In a real application, you would upload these files to your storage
// //         // For now, we'll just create object URLs for preview
// //         const urls = Array.from(files).map(file => URL.createObjectURL(file));

// //         if (type === 'gallery') {
// //             setPreviewImages(prev => [...prev, ...urls]);
// //             setFormData(prev => ({
// //                 ...prev,
// //                 images: [...prev.images, ...urls]
// //             }));
// //         } else {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 [type === 'before' ? 'beforeImage' : 'afterImage']: urls[0]
// //             }));
// //         }
// //     };

// //     const removeImage = (index: number) => {
// //         setPreviewImages(prev => prev.filter((_, i) => i !== index));
// //         setFormData(prev => ({
// //             ...prev,
// //             images: prev.images.filter((_, i) => i !== index)
// //         }));
// //     };

// //     // const handleSubmit = async (e: React.FormEvent) => {
// //     //     e.preventDefault();
// //     //     setLoading(true);

// //     //     try {
// //     //         // Here you would typically:
// //     //         // 1. Upload images to storage
// //     //         // 2. Save project data to database
// //     //         console.log('Submitting project:', formData);

// //     //         // Simulate API call
// //     //         await new Promise(resolve => setTimeout(resolve, 1500));

// //     //         // Reset form
// //     //         setFormData(initialFormData);
// //     //         setPreviewImages([]);
// //     //         alert('Project added successfully!');
// //     //     } catch (error) {
// //     //         console.error('Error adding project:', error);
// //     //         alert('Error adding project. Please try again.');
// //     //     } finally {
// //     //         setLoading(false);
// //     //     }
// //     // };

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         try {
// //             // Upload images to Appwrite Storage
// //             const uploadedImageIds = await Promise.all(
// //                 formData.images.map(async (imageFile) => {
// //                     if (imageFile instanceof File) {
// //                         const response = await ImageUpload(imageFile);
// //                         return response.$id;
// //                     }
// //                     return null;
// //                 })
// //             );
// //             const validImageIds = uploadedImageIds.filter(id => id !== null);

// //             // Save project data to Appwrite Database
// //             const response = await databases.createDocument(
// //                 DATABASE_ID,
// //                 COLLECTION_ID,
// //                 ID.unique(),
// //                 {

// //                     title: formData.title,
// //                     description: formData.description,
// //                     location: formData.location,
// //                     completionDate: formData.completionDate,
// //                     area: formData.area,
// //                     clientName: formData.client,
// //                     designerName: formData.designer,
// //                     category: "residential",
// //                     images: validImageIds,
// //                     beforeImage: formData.beforeImage instanceof File ? await ImageUpload(formData.beforeImage).then(res => res.$id) : "",
// //                     afterImage: formData.afterImage instanceof File ? await ImageUpload(formData.afterImage).then(res => res.$id) : "",
// //                     // createdAt: new Date().toISOString()
// //                 }
// //             );

// //             console.log("Project added:", response);

// //             // Reset form
// //             setFormData(prev => ({ ...initialFormData, images: validImageIds }));
// //             setPreviewImages([]);
// //             alert("Project added successfully!");
// //         } catch (error) {
// //             console.error("Error adding project:", error);
// //             alert("Error adding project. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };


// //     return (
// //         <div className="container mx-auto px-4 max-w-4xl">
// //             {/* <h1 className="text-3xl font-bold mb-8">Add New Project</h1> */}

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div className="bg-white p-6 space-y-6">
// //                     <div>
// //                         <Label className="mb-2">
// //                             Project Title
// //                         </Label>
// //                         <Input
// //                             type="text"
// //                             name="title"
// //                             value={formData.title}
// //                             onChange={handleInputChange}
// //                             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <Label className="mb-2">
// //                             Description
// //                         </Label>
// //                         <Textarea
// //                             name="description"
// //                             value={formData.description}
// //                             onChange={handleInputChange}
// //                             rows={4}
// //                             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                             required
// //                         />
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                             <Label className="mb-2">
// //                                 Location
// //                             </Label>
// //                             <Input
// //                                 type="text"
// //                                 name="location"
// //                                 value={formData.location}
// //                                 onChange={handleInputChange}
// //                                 // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                                 required
// //                             />
// //                         </div>

// //                         <div>
// //                             <Label className="mb-2">
// //                                 Completion Date
// //                             </Label>
// //                             <Input
// //                                 type="date"
// //                                 name="completionDate"
// //                                 value={formData.completionDate}
// //                                 onChange={handleInputChange}
// //                                 // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                                 required
// //                             />
// //                         </div>

// //                         <div>
// //                             <Label className="mb-2">
// //                                 Area (sqft)
// //                             </Label>
// //                             <Input
// //                                 type="number"
// //                                 name="area"
// //                                 value={formData.area}
// //                                 onChange={handleInputChange}
// //                                 // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                                 required
// //                             />
// //                         </div>

// //                         <div>
// //                             <Label className="mb-2">
// //                                 Client Name
// //                             </Label>
// //                             <Input
// //                                 type="text"
// //                                 name="client"
// //                                 value={formData.client}
// //                                 onChange={handleInputChange}
// //                                 // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                                 required
// //                             />
// //                         </div>

// //                         <div className="md:col-span-2">
// //                             <Label className="mb-2">
// //                                 Designer
// //                             </Label>
// //                             <Input
// //                                 type="text"
// //                                 name="designer"
// //                                 value={formData.designer}
// //                                 onChange={handleInputChange}
// //                                 // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// //                                 required
// //                             />
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <Label className="mb-2">
// //                             Project Images
// //                         </Label>
// //                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                             {previewImages.map((url, index) => (
// //                                 <div key={index} className="relative group">
// //                                     <img
// //                                         src={url}
// //                                         alt={`Preview ${index + 1}`}
// //                                         className="w-full h-32 object-cover rounded-lg"
// //                                     />
// //                                     <button
// //                                         type="button"
// //                                         onClick={() => removeImage(index)}
// //                                         className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //                                     >
// //                                         <X className="w-4 h-4" />
// //                                     </button>
// //                                 </div>
// //                             ))}
// //                             <Label className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
// //                                 <Plus className="w-8 h-8 text-gray-400" />
// //                                 <span className="text-sm text-gray-500 mt-2">Add Image</span>
// //                                 <Input
// //                                     type="file"
// //                                     accept="image/*"
// //                                     multiple
// //                                     onChange={(e) => handleImageUpload(e, 'gallery')}
// //                                     className="hidden"
// //                                 />
// //                             </Label>
// //                         </div>
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                             <Label className="mb-2">
// //                                 Before Image
// //                             </Label>
// //                             <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
// //                                 {formData.beforeImage ? (
// //                                     <img
// //                                         src={formData.beforeImage}
// //                                         alt="Before"
// //                                         className="w-full h-full object-cover"
// //                                     />
// //                                 ) : (
// //                                     <Label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
// //                                         <Upload className="w-8 h-8 text-gray-400" />
// //                                         <span className="text-sm text-gray-500 mt-2">Upload Before Image</span>
// //                                         <Input
// //                                             type="file"
// //                                             accept="image/*"
// //                                             onChange={(e) => handleImageUpload(e, 'before')}
// //                                             className="hidden"
// //                                         />
// //                                     </Label>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         <div>
// //                             <Label className="mb-2">
// //                                 After Image
// //                             </Label>
// //                             <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
// //                                 {formData.afterImage ? (
// //                                     <img
// //                                         src={formData.afterImage}
// //                                         alt="After"
// //                                         className="w-full h-full object-cover"
// //                                     />
// //                                 ) : (
// //                                     <Label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
// //                                         <Upload className="w-8 h-8 text-gray-400" />
// //                                         <span className="text-sm text-gray-500 mt-2">Upload After Image</span>
// //                                         <Input
// //                                             type="file"
// //                                             accept="image/*"
// //                                             onChange={(e) => handleImageUpload(e, 'after')}
// //                                             className="hidden"
// //                                         />
// //                                     </Label>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <Button
// //                     type="submit"
// //                     className="w-full"
// //                     disabled={loading}
// //                 >
// //                     {loading ? (
// //                         <>
// //                             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// //                             Adding Project...
// //                         </>
// //                     ) : (
// //                         'Add Project'
// //                     )}
// //                 </Button>
// //             </form>
// //         </div>
// //     );
// // }

// "use client"

// import React, { useState } from 'react';
// import { Upload, X, Plus, Loader2 } from 'lucide-react';
// import { Button } from './ui/button';
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Textarea } from './ui/textarea';
// import Image from 'next/image';
// import { ImageUpload } from '@/app/actions/appwrite';

// interface FormData {
//     title: string;
//     description: string;
//     location: string;
//     completionDate: string;
//     area: string;
//     client: string;
//     designer: string;
//     images: File[];
//     beforeImage: File | null;
//     afterImage: File | null;
// }

// const initialFormData: FormData = {
//     title: '',
//     description: '',
//     location: '',
//     completionDate: '',
//     area: '',
//     client: '',
//     designer: '',
//     images: [],
//     beforeImage: null,
//     afterImage: null
// };

// export default function AddProduct() {
//     const [formData, setFormData] = useState<FormData>(initialFormData);
//     const [loading, setLoading] = useState(false);
//     // const [previewImages, setPreviewImages] = useState<string[]>([]);
//     const [images, setImages] = useState<File[]>([])
//     const [beforeImage, setBeforeImage] = useState(null)
//     const [afterImage, setAfterImage] = useState(null)

//     const handleBeforeImageChange = (event: any) => {
//         const file = event.target.files[0];
//         console.log('File selected:', file.name);
//         setBeforeImage(file);
//     };

//     const handleAfterImageChange = (event: any) => {
//         const file = event.target.files[0];
//         console.log('File selected:', file.name);
//         setAfterImage(file);
//     };



//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setImages([...images, ...Array.from(e.target.files)])
//         }
//     }

//     const removeImage = (index: number) => {
//         setImages(images.filter((_, i) => i !== index))
//     }

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };




//     const handleSubmit = async () => {
//         if (!beforeImage || !afterImage) {
//             console.log("Both images must be selected before submitting.");
//             return;
//         }

//         const beforeImageFile = beforeImage;
//         const afterImageFile = afterImage;

//         const afterImageUrl = await ImageUpload(afterImageFile);
//         const beforeImageUrl = await ImageUpload(beforeImageFile);

//         console.log("Uploaded:", { beforeImageUrl, afterImageUrl });
//     };

//     // if (afterImage) {
//     //     const afterImageUrl = await ImageUpload(afterImage);
//     //     console.log("afterImageUrl:",afterImageUrl.$id)
//     // }


//     return (
//         <div className="container mx-auto px-4 max-w-4xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="bg-white p-6 space-y-6">
// <div>
//     <Label className="block text-sm font-medium text-gray-700 mb-2">
//         Project Title
//     </Label>
//     <Input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleInputChange}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//         // required
//     />
// </div>

// <div>
//     <Label className="block text-sm font-medium text-gray-700 mb-2">
//         Description
//     </Label>
//     <Textarea
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         rows={4}
//         // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//         // required
//     />
// </div>

// <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <div>
//         <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Location
//         </Label>
//         <Input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             // required
//         />
//     </div>

//     <div>
//         <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Completion Date
//         </Label>
//         <Input
//             type="date"
//             name="completionDate"
//             value={formData.completionDate}
//             onChange={handleInputChange}
//             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             // required
//         />
//     </div>

//     <div>
//         <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Area (sqft)
//         </Label>
//         <Input
//             type="number"
//             name="area"
//             value={formData.area}
//             onChange={handleInputChange}
//             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             // required
//         />
//     </div>

//     <div>
//         <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Client Name
//         </Label>
//         <Input
//             type="text"
//             name="client"
//             value={formData.client}
//             onChange={handleInputChange}
//             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             // required
//         />
//     </div>

//     <div className="md:col-span-2">
//         <Label className="block text-sm font-medium text-gray-700 mb-2">
//             Designer
//         </Label>
//         <Input
//             type="text"
//             name="designer"
//             value={formData.designer}
//             onChange={handleInputChange}
//             // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             // required
//         />
//     </div>
// </div>

// {/* <div>
//     <Label className="block text-sm font-medium text-gray-700 mb-2">
//         Project Images
//     </Label>
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((image, index) => (
//             <div key={index} className="relative group">
//                 <Image
//                     src={URL.createObjectURL(image)}
//                     alt={`Preview ${index + 1}`}
//                     fill
//                     className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <Button
//                     type="button"
//                     variant="destructive"
//                     size="icon"
//                     className="absolute -top-2 -right-2 h-6 w-6"
//                     onClick={() => removeImage(index)}
//                 >
//                     <X className="h-4 w-4" />
//                 </Button>
//             </div>
//         ))}
//                             <Label className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-primary">
//                                 <Input
//                                     type="file"
//                                     accept="image/*"
//                                     multiple
//                                     className="hidden"
//                                     onChange={handleImageChange}
//                                 />
//                                 <Upload className="h-6 w-6" />
//                             </Label>

//                             <Label className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
//                                 <Plus className="w-8 h-8 text-gray-400" />
//                                 <span className="text-sm text-gray-500 mt-2">Add Image</span>
//                                 <Input
//                                     type="file"
//                                     accept="image/*"
//                                     multiple
//                                     // onChange={(e) => handleImageUpload(e, 'gallery')}
//                                     className="hidden"
//                                 />
//                             </Label>
//                         </div>
//                     </div> */}

//                     <Label htmlFor="images">Product Images</Label>
//                     <div className="mt-2 grid grid-cols-4 gap-4">
//                         {images.map((image, index) => (
//                             <div key={index} className="relative aspect-square">
//                                 <Image
//                                     src={URL.createObjectURL(image)}
//                                     alt={`Preview ${index + 1}`}
//                                     fill
//                                     className="rounded-lg object-cover w-full h-full"
//                                 />
//                                 <Button
//                                     type="button"
//                                     variant="destructive"
//                                     size="icon"
//                                     className="absolute -top-2 -right-2 h-6 w-6"
//                                     onClick={() => removeImage(index)}
//                                 >
//                                     <X className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         ))}
//                         <Label className="border-2 border-dashed border-gray-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
//                             <Input
//                                 type="file"
//                                 accept="image/*"
//                                 multiple
//                                 className="hidden"
//                                 onChange={handleImageChange}
//                             />
//                             <Plus className="w-8 h-8 text-gray-400" />
//                             <span className="text-sm text-gray-500 mt-2">Add Image</span>
//                         </Label>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <Label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Before Image
//                             </Label>
//                             <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
//                                 {beforeImage ? (
//                                     <Image
//                                         src={URL.createObjectURL(beforeImage)}
//                                         alt="Before"
//                                         fill
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <Label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <Upload className="w-8 h-8 text-gray-400" />
//                                         <span className="text-sm text-gray-500 mt-2">Upload Before Image</span>
//                                         <Input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleBeforeImageChange}
//                                             className="hidden"
//                                         />
//                                     </Label>
//                                 )}
//                             </div>
//                         </div>

//                         <div>
//                             <Label className="block text-sm font-medium text-gray-700 mb-2">
//                                 After Image
//                             </Label>
//                             <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
//                                 {afterImage ? (
//                                     <Image
//                                         src={URL.createObjectURL(afterImage)}
//                                         alt="After"
//                                         fill
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <Label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <Upload className="w-8 h-8 text-gray-400" />
//                                         <span className="text-sm text-gray-500 mt-2">Upload After Image</span>
//                                         <Input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleAfterImageChange}
//                                             className="hidden"
//                                         />
//                                     </Label>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <Button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full"
//                 >
//                     {loading ? (
//                         <>
//                             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                             Adding Project...
//                         </>
//                     ) : (
//                         'Add Project'
//                     )}
//                 </Button>
//             </form>
//         </div>
//     );
// }



"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { createProjectDocument, ImageUpload } from "@/app/actions/appwrite"
import { COLLECTION_ID, DATABASE_ID, databases } from "@/lib/appwrite"
import { ID } from "appwrite"
import { Textarea } from "./ui/textarea"
import { ProjectFormData } from "@/lib/projects"

const initialFormData: ProjectFormData = {
    title: "",
    description: "",
    location: "",
    completionDate: "",
    area: "",
    client: "",
    designer: "",
    images: [],
    beforeImage: null,
    afterImage: null,
}

export default function ProjectForm() {
    const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [beforeImage, setBeforeImage] = useState<File | null>(null)
    const [afterImage, setAfterImage] = useState<File | null>(null)

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

            // Create project document
            const response = await createProjectDocument(formData, imageIds, beforeImageId, afterImageId);

            console.log("Project added:", response)
            // Reset form
            setFormData(initialFormData)
            setImages([])
            setBeforeImage(null)
            setAfterImage(null)
            alert("Project added successfully!")
        } catch (error) {
            console.error("Error adding project:", error)
            alert("Error adding project. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 space-y-6">
                    {/* ... (keep the existing input fields for title, description, etc.) ... */}

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
                        // required
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
                        // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        // required
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
                            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            // required
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
                            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            // required
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
                            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            // required
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
                            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            // required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Designer
                            </Label>
                            <Input
                                type="text"
                                name="designer"
                                value={formData.designer}
                                onChange={handleInputChange}
                            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            // required
                            />
                        </div>
                    </div>

                    {/* {/* <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Images
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="w-full h-32 object-cover rounded-lg"
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
                            ))} */}


                    <Label htmlFor="images">Project Images</Label>
                    <div className="mt-2 grid grid-cols-4 gap-4">
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
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors"
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

                <Button type="submit" disabled={loading} className="w-full">
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

