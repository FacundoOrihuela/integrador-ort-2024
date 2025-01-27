import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import config from "../../utils/config.json";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MyGroups = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      setIsSidebarOpen(!isSmallScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `${config.apiUrl}/api/groups/user/${user.id}/groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGroups(data.data);
        } else {
          console.error("Error al obtener los grupos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchGroups();
  }, [user, token]);

  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 60px)" }}>
      {isMobile && (
        <div className="relative">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`absolute top-[20px] ${isSidebarOpen ? "left-[96px]" : "left-0"} bg-black text-white py-2 rounded-r-md z-10 flex items-center justify-center transition-all duration-300`}
          >
            {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>

          <div
            className={`overflow-y-auto top-[60px] pb-[76px] p-4 bg-gray-100 fixed left-0 h-full z-20 transition-transform duration-300 ${isSidebarOpen ? "transform translate-x-0" : "transform -translate-x-full"}`}
          >
            <div className="flex flex-col gap-4 overflow-y-auto max-h-screen">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div
                    key={group.id}
                    className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => onGroupSelect(group)}
                  >
                    {group.photo ? (
                      <img
                        src={group.photo}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="h-full flex items-center justify-center">
                        {group.name}
                      </p>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100">
                      <p className="text-white text-sm font-bold">{group.name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No estás en ningún grupo aún.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Vista para pantallas más grandes */}
      {!isMobile && (
        <div className="p-4 bg-gray-100" style={{ paddingBottom: "60px" }}>
          <div className="flex flex-col gap-4">
            {groups.length > 0 ? (
              groups.map((group) => (
                <div
                  key={group.id}
                  className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => onGroupSelect(group)}
                >
                  {group.photo ? (
                    <img
                      src={group.photo}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="h-full flex items-center justify-center">
                      {group.name}
                    </p>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100">
                    <p className="text-white text-sm font-bold">{group.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No estás en ningún grupo aún.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
