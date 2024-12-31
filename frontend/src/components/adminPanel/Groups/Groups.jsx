import React from 'react'
import GroupsList from './GroupsList';

const Groups = () => {
return (
    <div className="relative">
        <h1 className="flex justify-center items-center p-2 text-4xl">Grupos</h1>
        <GroupsList />
    </div>
    );
}

export default Groups