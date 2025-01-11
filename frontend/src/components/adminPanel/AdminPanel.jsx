import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import UserList from "./Users/UsersList";
import Sidebar from "./Sidebar";
import ActivitiesList from "./Activities/ActivitiesList";
import Groups from "./Groups/Groups";
import MembershipList from "./Memberships/MembershipList";
import ShoppingList from "./Orders/ShoppingList";
import AdminProductList from "./Products/AdminProductList";
import CategoryList from "./Categories/CategoryList";
import { Box } from "@mui/material";

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
        return <MembershipList />;
      case "ShoppingList":
        return <ShoppingList />;
      case "Activities":
        return <ActivitiesList />;
      case "Groups":
        return <Groups />;
      case "Products":
        return <AdminProductList />;
      case "Categories":
        return <CategoryList />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          selectedComponent={selectedComponent}
          onSelect={setSelectedComponent}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, marginLeft: `${drawerWidth}px`, padding: 2 }}
        >
          {renderComponent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;
