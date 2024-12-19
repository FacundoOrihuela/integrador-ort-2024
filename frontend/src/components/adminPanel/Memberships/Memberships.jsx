import React, { useState } from "react";
import MembershipList from "./MembershipList";
import CreateMemberships from "./CreateMemberships";

const Memberships = () => {

  return (
    <div className="relative">
      <h1 className="flex justify-center items-center p-2 text-4xl">Membresías</h1>
      <MembershipList />
    </div>
  );
};

export default Memberships;
