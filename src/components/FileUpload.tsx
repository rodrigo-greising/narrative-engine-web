"use client";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from 'next/navigation'
import { uploadPDFToS3 } from "@/lib/s3";
import md5 from "md5";


// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = () => {
    const {campaignId} = useParams();
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
                    const reader = new FileReader()
                    reader.onload = async function (event) {
                        const binary = event.target?.result as ArrayBuffer;
                        const hashArray = Array.from(new Uint8Array(binary));
                        const hash = md5(hashArray);
                        
                        const response = await axios.post("/api/check-file-exists", {
                            hash,
                            title: file.name,
                            campaignId: campaignId,
                        });
                        if (response.status === 200) {
                            toast.error("File added to campaign");
                            return;
                        }
    
                        setUploading(true);
                        const data = await uploadPDFToS3(file, hash);
                        if (!data?.hash || !data.file_name) {
                            toast.error("Something went wrong");
                            return;
                        }
                        mutate({
                            hash,
                            title: file.name,
                            campaignId: campaignId,
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
                    
                    }
                    reader.readAsArrayBuffer(file);                  
                } catch (error) {
                    console.log(error);
                } finally {
                    setUploading(false);
                }
            });
        },
    });



    return (

            <div {...getRootProps({
                className: 'h-1/8 border-dashed border-2 border-blue-violet-500 rounded-xl cursor-pointer py-8 px-4 flex justify-center items-center flex-col mb-10'
            })}>
                <input {...getInputProps()} />
                <Inbox className='text-blue-violet-600' />
                <p className='text-blue-violet-600 text-center'>Drop rulebooks here</p>
            </div>
);}



export default FileUpload;