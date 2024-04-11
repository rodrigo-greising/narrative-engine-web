import React from 'react'
import { CircleCheckBig, FileText, Mic } from 'lucide-react';
import DeleteButton from './ui/DeleteButton';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { getPDFS3Url } from '@/lib/s3';


const FileList = ({ files }) => {

    function extractDate(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toISOString().split('T')[0];
    }

    const PdfBlock = ({ file }) => {
        const { name, dateUploaded, isIndexed, hash, imageUrl } = file;

        return (
            <div className="relative group">
                <div className="flex items-center justify-between py-2">
                    <AspectRatio ratio={1 / 1.414} className="rounded-3xl">
                        <Image
                            alt={name}
                            src={imageUrl}
                            objectFit="cover"
                            fill={true}
                        />
                    </AspectRatio>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                    <span>{name}</span>
                    <span className="text-sm text-slate-600  w-30">{extractDate(dateUploaded)}</span>
                    <CircleCheckBig className={isIndexed ? 'text-green-500' : 'text-gray-500'} />
                    <DeleteButton hash="" />
                </div>
            </div>
        );
    };


    return (
        <div className="grid gap-3 p-4  sm:grid-cols-2  lg:grid-cols-5 w-2/3">
            {files.map((file, index) => (
                <PdfBlock key={index} file={file} />
            ))}
        </div>
    );
};


export default FileList;