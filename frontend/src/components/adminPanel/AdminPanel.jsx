import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import UserList from "./UsersList";
import CreateMemberships from "./Memberships/CreateMemberships";
import MembershipList from "./Memberships/MembershipList";
import Sidebar from "./Sidebar";
import CreateActivity from "./Activities/CreateActivity";
import Activities from "./Activities/Activities";
import Memberships from "./Memberships/Memberships";

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
      case "Memberships":
        return <Memberships />;
      case "Activities":
        return <Activities />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="relative container mx-auto flex h-[100vh]">
        <div
          className="fixed left-0 top-0 h-full w-[40px] bg-transparent z-[999] cursor-pointer"
          onClick={() => setShowSidebar(true)}
        ></div>

        <Sidebar
          className={`${
            showSidebar ? "translate-x-0" : "-translate-x-[90%]"
          }`}
          onMouseLeave={() => setShowSidebar(false)}
          onSelect={setSelectedComponent}
        />
        <div className="flex flex-col m-[104px] w-full">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
