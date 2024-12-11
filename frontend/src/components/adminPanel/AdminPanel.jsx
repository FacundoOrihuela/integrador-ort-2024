import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import UserList from "./UsersList";
import CreateMemberships from "./CreateMemberships";
import MembershipList from "./MembershipList";
import Sidebar from "./Sidebar";

const AdminPanel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("UserList");
  const [showSidebar, setShowSidebar] = useState(false);

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
      case "CreateMemberships":
        return <CreateMemberships />;
      case "MembershipList":
        return <MembershipList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="relative container mx-auto flex">
        <div className="absolute left-0 h-[calc(100%-64px)] w-10 bg-transparent z-10" onMouseEnter={() => setShowSidebar(true)}></div>
        <Sidebar
          className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} `}
          onMouseLeave={() => setShowSidebar(false)}
          onSelect={setSelectedComponent}
        />
        <div className="flex flex-col w-full">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
