import React, { useEffect, useContext } from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.userType !== "administrator") {
            navigate("../*");
        }
    }, [user, navigate]);

  return (
    <div>AdminPanel</div>
  )
}

export default AdminPanel