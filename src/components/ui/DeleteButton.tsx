'use client'

import React from 'react';
import { Button } from './button';


const DeleteButton  = (hash) => {
    const handleDelete = () => {
        // Implement deletion logic here
        console.log(`Delete ${hash}`);
    };

    return (
        <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-slate-100 font-bold py-1 px-3 rounded">
            Delete
        </Button>
    );
};

export default DeleteButton;