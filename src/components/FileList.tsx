import React from 'react'
import { CircleCheckBig, FileText, Mic } from 'lucide-react';
import DeleteButton from './ui/DeleteButton';


const FileList = ({files}) => {

    function extractDate(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toISOString().split('T')[0];
      }
    
    const FileRow = ({ file }) => {
        const { name, dateUploaded, isIndexed } = file;

        return (
            <div className="flex items-center justify-between py-2">
                <span className="flex items-center w-1/3">
                    <i className="fas fa-file-alt text-slate-600  mr-2"></i>
                    <FileText />
                    <span className="font-medium text-slate-600 w-full">{name}</span>
                </span>
                <span className="text-sm text-slate-600  w-30">{extractDate(dateUploaded)}</span>
                <CircleCheckBig className={isIndexed ? 'text-green-500' : 'text-gray-500'} />
                <DeleteButton hash="" />
            </div>
        );
    };


    return (
        <div className="w-full divide-y divide-blue-violet-500 p-4">
            {files.map((file, index) => (
                <FileRow key={index} file={file} />
            ))}
        </div>
    );
};


export default FileList;