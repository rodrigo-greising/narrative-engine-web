'use client'
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import FileList from './FileList';
 
const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {'application/pdf' : [".pdf"]},
        maxSize: 100*1024*1024,
        onDrop: async (acceptedFiles) => {
            acceptedFiles.forEach(async (file) => {
                try {            
                    const data = await uploadToS3(file);
                }
                catch (e) {
                    console.log(e);
                }
              });
        }
    });

    const files = [
        { name: 'file1.pdf', dateUploaded: '2023-03-23', isIndexed: true },
        { name: 'report.docx', dateUploaded: '2023-03-22', isIndexed: false },
        // Add more files here
    ];

    return (
    <div className='p-2 rounded-xl h-3/4 w-3/4 flex justify-center items-center flex-col pt-16'>
        <h4 className="text-2xl h-6 text-blue-violet-500 font-bold pb-16">Upload and manage your source books here.</h4>
        <div {...getRootProps({
            className: 'w-1/4 h-1/8 border-dashed border-2 border-blue-violet-500 rounded-xl cursor-pointer py-8 flex justify-center items-center flex-col mb-10'
        })}>
            <input {...getInputProps()}/>
               <Inbox className='text-blue-violet-600'/>
                <p className='text-blue-violet-600 text-center'>Drop rulebooks here</p>
        </div>
        <FileList files={files} seeRecording={false}/>
    </div>);
}



export default FileUpload;