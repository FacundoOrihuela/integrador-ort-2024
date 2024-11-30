import React from 'react';
import Event from './event/Event';  
import Header from './Header';  
import Sidebar from './Sidebar';


const Principal = () => {

    return (
        <div>
            <h1 style={{justifyContent:"center", alignItems:"center", padding:"150px"}}>Principal</h1>
            <Header/>
            <Sidebar/>
            
        </div>
    );
};

export default Principal;
