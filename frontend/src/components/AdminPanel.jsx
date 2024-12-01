import React, { useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

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
        <div>AdminPanel</div>
    );
};

export default AdminPanel;