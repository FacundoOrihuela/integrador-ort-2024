import React, { useContext } from "react";
import Event from "./event/Event";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserContext } from "../context/UserContext";

const Principal = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1 style={{ justifyContent: "center", alignItems: "center", padding: "150px" }}>
                Bienvenido {user ? user.name : ""}
            </h1>
            <Header />
            <Sidebar />
        </div>
    );
};

export default Principal;
