import React, { useState } from "react";
import Header from "../Header";
import MyGroups from "./MyGroups";
import Footer from "../Footer";
import GroupPanel from "./GroupPanel";

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="bg-gray-100">
          <MyGroups onGroupSelect={setSelectedGroup} />
        </div>
        <div className="flex-grow">
          <GroupPanel group={selectedGroup} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Groups;
