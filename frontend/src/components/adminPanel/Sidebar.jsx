import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PeopleIcon from "@mui/icons-material/People";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";

const Sidebar = ({ onSelect, selectedComponent }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuItems = [
    { text: "Usuarios", icon: <PeopleIcon />, component: "UserList" },
    { text: "Membresías", icon: <CardMembershipIcon />, component: "Memberships" },
    { text: "Actividades", icon: <EventIcon />, component: "Activities" },
    { text: "Grupos", icon: <GroupIcon />, component: "Groups" },
    { text: "Compras", icon: <ShoppingCartIcon />, component: "ShoppingList" },
    { text: "Productos", icon: <StoreIcon />, component: "Products" },
    { text: "Categorías", icon: <CategoryIcon />, component: "Categories" },
    { text: "Noticias", icon: <ArticleIcon />, component: "News" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      setIsOpen(!isSmallScreen);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {isMobile && (
        <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-[100px] ${isOpen ? "left-[240px]" : "left-0"} bg-gray-300 text-black border border-black py-2 rounded-r-md z-10 flex items-center justify-center transition-all duration-300`}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
      )}

      <Drawer
        variant={isMobile ? "persistent" : "permanent"}
        open={isMobile ? isOpen : true}
        onClose={toggleSidebar}
        className="z-[100] bg-gray-100 shadow-md"
        PaperProps={{
          className: "w-60 md:mt-[70px] mt-[50px]",
        }}
      >
        <List className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => onSelect(item.component)}
              sx={{
                "&:hover": { backgroundColor: "primary.main" },
                backgroundColor:
                  selectedComponent === item.component ? "primary.main" : "inherit",
              }}
              className={`hover:bg-gray-300 ${
                selectedComponent === item.component ? "text-white" : ""
              }`}
            >
              <ListItemIcon
                sx={{
                  color: selectedComponent === item.component ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                className={selectedComponent === item.component ? "text-white" : ""}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;