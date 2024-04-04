"use client";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/lib/s3";
import FileList from "./FileList";
import md5 from "md5";


// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = ({ pageProps }) => {
    const session = pageProps?.session;
    const router = useRouter();
    const [uploading, setUploading] = React.useState(false);
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({
            hash,
            campaignId,
            title
        }: {
            hash: string;
            campaignId: number;
            title: string;
        }) => {
            debugger;
            const response = await axios.post("/api/embed-document", {
                hash, campaignId, title
            });
            return response.data;
        },
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        onDrop: async (acceptedFiles) => {
            acceptedFiles.forEach(async (file) => {
                try {
                    const hash = md5(file);
                    const response = await axios.post("/api/check-file-exists", {
                        hash,
                        title: file.name,
                        campaignId: 1,
                    });
                    if (response.status === 200) {
                        toast.error("File added to campaign");
                        return;
                    }

                    setUploading(true);
                    const data = await uploadToS3(file, hash);
                    if (!data?.hash || !data.file_name) {
                        toast.error("Something went wrong");
                        return;
                    }
                    mutate({ 
                        hash,
                        title: file.name,
                        campaignId: 1, 
                    }, {
                        onSuccess: ({ chat_id }) => {
                            console.log(chat_id);
                            toast.success("Chat created!");
                        },
                        onError: (err) => {
                            toast.error("Error creating chat");
                            console.error(err);
                        },
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    setUploading(false);
                }
            });
        },
    });



    return (
        <div className='p-2 rounded-xl h-3/4 w-3/4 flex justify-center items-center flex-col pt-16'>
            <h4 className="text-2xl h-6 text-blue-violet-500 font-bold pb-16">Upload and manage your source books here.</h4>
                <FileList seeRecording={false} />
            <div {...getRootProps({
                className: 'w-1/4 h-1/8 border-dashed border-2 border-blue-violet-500 rounded-xl cursor-pointer py-8 flex justify-center items-center flex-col mb-10'
            })}>
                <input {...getInputProps()} />
                <Inbox className='text-blue-violet-600' />
                <p className='text-blue-violet-600 text-center'>Drop rulebooks here</p>
            </div>
        </div>);
}



export default FileUpload;