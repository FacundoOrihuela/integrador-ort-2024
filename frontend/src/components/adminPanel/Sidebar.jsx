import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";

const Sidebar = ({ onSelect, selectedComponent }) => {
  const menuItems = [
    { text: "Usuarios", icon: <PeopleIcon />, component: "UserList" },
    { text: "Membresías", icon: <CardMembershipIcon />, component: "Memberships" },
    { text: "Actividades", icon: <EventIcon />, component: "Activities" },
    { text: "Grupos", icon: <GroupIcon />, component: "Groups" },
    { text: "Compras", icon: <ShoppingCartIcon />, component: "ShoppingList" },
    { text: "Productos", icon: <StoreIcon />, component: "Products" },
    { text: "Categorías", icon: <CategoryIcon />, component: "Categories" },
  ];

  return (
    <Drawer
      variant="permanent"
      className="z-[100] bg-gray-100 shadow-md"
      PaperProps={{
        className: "w-60 mt-20",
      }}
    >
      <List className="flex flex-col gap-1">
        {menuItems.map((item) => {
          return (
            <ListItemButton
              key={item.text}
              onClick={() => onSelect(item.component)}
              sx={{
                "&:hover": { backgroundColor: "gray.300" },
                backgroundColor: selectedComponent === item.component ? "primary.main" : "inherit",
              }}
              className={`hover:bg-gray-300 ${selectedComponent === item.component ? "text-white" : ""}`}
            >
              <ListItemIcon
                sx={{
                  color: selectedComponent === item.component ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} className={selectedComponent === item.component ? "text-white" : ""} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
