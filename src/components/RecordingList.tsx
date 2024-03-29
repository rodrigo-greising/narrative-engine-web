'use client'
import React from 'react'
import Link from 'next/link';
import { CircleCheckBig } from 'lucide-react';


const RecordingList = ({ files }) => {

    const FileRow = ({ file }) => {
        const { id, name, dateUploaded, isIndexed } = file;
    
        const handleDelete = () => {
            // Implement deletion logic here
            console.log(`Delete ${name}`);
        };
    
        return (
            <div className="flex items-center justify-between py-6">
                <span className="flex items-center w-10">
                    <i className="fas fa-file-alt text-slate-100 mr-2"></i>
                    <span className="font-medium text-slate-100">{name}</span>
                </span>
                <span className="text-sm text-slate-100 w-30">{dateUploaded}</span>
                <CircleCheckBig className={isIndexed ? 'text-green-500' : 'text-gray-500'}/>
                <Link href={`game-recordings/${id}`} className="bg-slate-500 hover:bg-slate-700 text-slate-100 font-bold py-1 px-3 rounded">Show Recordings</Link>
                <button 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-slate-100 font-bold py-1 px-3 rounded">
                    Delete
                </button>
            </div>
        );
    };


    return (
        <div className="w-full divide-y divide-slate-500 p-4">
            {files.map((file, index) => (
                <FileRow key={index} file={file} />
            ))}
        </div>
    );
};


export default RecordingList;