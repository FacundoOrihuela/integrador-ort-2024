import React, { useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminPanel = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user === null) {
            return;
        }
        if (!user || user.userType !== "administrator") {
            navigate("../*");
        }
    }, [user, navigate]);

    if (user === null) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div style={{ justifyContent: "center", alignItems: "center", padding: "150px" }}>AdminPanel</div>
            <Header />
            <Sidebar />   
        </div>
    );
};

export default AdminPanel;