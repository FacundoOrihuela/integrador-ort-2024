import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import UserList from "./UsersList";
import Sidebar from "./Sidebar";
import Activities from "./Activities/Activities";
import Memberships from "./Memberships/Memberships";
import ShoppingList from "./Activities/ShoppingList";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const drawerWidth = 240;

const AdminPanel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("UserList");

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

  const renderComponent = () => {
    switch (selectedComponent) {
      case "UserList":
        return <UserList />;
      case "Memberships":
        return <Memberships />;
      case "ShoppingList":
        return <ShoppingList />;
      case "Activities":
        return <Activities />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar onSelect={setSelectedComponent} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}
      >
        <Toolbar />
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default AdminPanel;
