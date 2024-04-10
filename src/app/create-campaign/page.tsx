"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { campaignZod } from "@/lib/zod/campainZod"
import { Button } from "@/components/ui/button"
import { uploadImageToS3 } from "@/lib/s3"
import { Inbox } from "lucide-react"
import { useDropzone } from "react-dropzone"
import NavMenu from "@/components/NavMenu"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function ProfileForm() {
    const form = useForm<z.infer<typeof campaignZod>>({
        resolver: zodResolver(campaignZod),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof campaignZod>) {
        const fileInput = values.image;

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/webp": [".webp", ".jpg", ".png"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            acceptedFiles.forEach(async (file) => {
                try {
                    const data = await uploadImageToS3(file);
                    console.log(data);

                } catch (error) {
                    console.log(error);
                }
            });
        },
    });

    return (
        <div>
            <NavMenu />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the title of the campaign.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>description</FormLabel>
                            <FormControl>
                                <Input placeholder="description" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the description of the campaign.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div {...getRootProps({
                    className: 'h-1/8 border-dashed border-2 border-blue-violet-500 rounded-xl cursor-pointer py-8 px-4 flex justify-center items-center flex-col mb-10'
                })}>
                    <input {...getInputProps()} />
                    <Inbox className='text-blue-violet-600' />
                    <p className='text-blue-violet-600 text-center'>Drop image here</p>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </div>
    )
}

export default ProfileForm;