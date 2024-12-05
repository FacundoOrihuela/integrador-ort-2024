import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import UserList from "./UsersList";
import CreateMemberships from "./CreateMemberships";
import MembershipList from "./MembershipList";

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
    <div className="mt-20">
      <UserList />
      <CreateMemberships />
      <MembershipList/>
      <Header />
    </div>
  );
};

export default AdminPanel;
