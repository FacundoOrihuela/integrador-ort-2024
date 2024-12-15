import React, { useState } from "react";
import MembershipList from "./MembershipList";
import CreateMemberships from "./CreateMemberships";

const Memberships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleUpdateOrCreate = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <h1 className="flex justify-center items-center p-2 text-4xl">Membresías</h1>
      <MembershipList />
    </div>
  );
};

export default Memberships;
