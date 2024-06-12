import React from 'react'
import { CircleCheckBig, FileText, Mic } from 'lucide-react';
import DeleteButton from './ui/DeleteButton';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { getPDFS3Url } from '@/lib/s3';
import Link from 'next/link';


const FileList = ({ files }) => {


    const PdfBlock = ({ file }) => {
        const { name, isIndexed, hash, imageUrl } = file;

        return (
            <div className="relative group">
                <Link href={`source-books/${hash}`}>
                    <div className="flex items-center justify-between py-2">
                        <AspectRatio ratio={1 / 1.414} className="rounded-3xl">
                            <Image
                                alt={name}
                                src={imageUrl}
                                fill={true}
                                sizes='256px'
                                className='cover'
                            />
                        </AspectRatio>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-between bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                        <span className='mt-4 text-center'>{name}</span>
                        <CircleCheckBig className={isIndexed ? 'text-green-500' : 'text-gray-500'} />
                        <DeleteButton hash={hash}/>
                    </div>
                </Link>
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