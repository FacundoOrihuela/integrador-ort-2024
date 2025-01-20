import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import ParticipantsList from "./ParticipantsList";
import PostItem from "./PostItem";
import CreatePostModal from "./CreatePostModal";
import ParticipantModal from "./ParticipantModal";
import ConfigGroupModal from "./ConfigGroupModal";
import AddParticipantsModal from "./AddParticipantsModal";
import EditGroup from "./EditGroup";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";


const GroupPanel = ({ group }) => {
  const [participants, setParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const loadInfoAsync = async () => {
    await fetchParticipants();
    await fetchAllUsers();
  };

  useEffect(() => {
    loadInfoAsync();// eslint-disable-next-line
  }, [group, token]); 

  useEffect(() => {
    if (group) {
      fetchPosts();
    }// eslint-disable-next-line
  }, [group]);

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user) => user.userType !== "administrator"
        );
        setAllUsers(filteredUsers);
      } else {
        console.error(
          "Error al obtener todos los usuarios:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const fetchParticipants = async () => {
    if (!group || !token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/groups/${group.id}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setParticipants(data.data);
      } else {
        console.error(
          "Error al obtener los participantes:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleOpenParticipantModal = (participant) => {
    setSelectedParticipant(participant);
    setParticipantModalOpen(true);
  };

  const handleCloseParticipantModal = () => {
    setParticipantModalOpen(false);
    setSelectedParticipant(null);
  };

  const handleOpenCreatePostModal = () => {
    setCreatePostModalOpen(true);
  };

  const handleCloseCreatePostModal = () => {
    setCreatePostModalOpen(false);
    setNewPostContent("");
    setSelectedPost(null);
  };

  const handleCreateOrUpdatePost = async () => {
    if (newPostContent.trim()) {
      if (selectedPost) {
        await updatePost(selectedPost, newPostContent);
      } else {
        await createPost(newPostContent);
      }
      handleCloseCreatePostModal();
    } else {
      alert("El contenido del post no puede estar vacío.");
    }
  };

  const handleRemoveParticipant = async () => {
    if (!selectedParticipant || !token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/groups/remove-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: group.id,
            userId: selectedParticipant.id,
          }),
        }
      );

      if (response.ok) {
        setParticipants((prev) =>
          prev.filter(
            (participant) => participant.id !== selectedParticipant.id
          )
        );
        handleCloseParticipantModal();
      } else {
        console.error("Error al eliminar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleAddParticipants = async () => {
    if (selectedUsers.length === 0) return;

    try {
      for (const selectedUser of selectedUsers) {
        const response = await fetch(
          `http://localhost:3001/api/groups/add-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              groupId: group.id,
              userId: selectedUser.id,
            }),
          }
        );

        if (response.ok) {
          console.log(`Usuario ${selectedUser.name} agregado al grupo.`);
        } else {
          console.error("Error al agregar usuario:", response.statusText);
        }
      }

      setOpenModal(false);
      setConfigModalOpen(false);
      setSelectedUsers([]);
      fetchParticipants();
    } catch (error) {
      console.error("Error al agregar participantes:", error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedIds = event.target.value;
    const selectedUsersList = allUsers.filter(
      (user) =>
        selectedIds.includes(user.id) &&
        !selectedUsers.some((u) => u.id === user.id)
    );
    setSelectedUsers([...selectedUsers, ...selectedUsersList]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setNewPostContent(post.content);
    setCreatePostModalOpen(true);
  };
  // Obtener todos los posts del grupo
  const fetchPosts = async () => {
    if (!group) return; // Add this check
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/group/${group.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data.data);
      } else {
        console.error("Error al obtener los posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Crear un nuevo post
  const createPost = async (content) => {
    try {
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          groupId: group.id,
          content,
        }),
      });
      if (response.ok) {
        await fetchPosts();
      } else {
        console.error("Error al crear el post:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Actualizar un post
  const updatePost = async (post, content) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: post.userId,
            groupId: post.groupId,
            content: content,
          }),
        }
      );
      if (response.ok) {
        await fetchPosts();
      } else {
        console.error("Error al actualizar el post:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Eliminar un post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Error al eliminar el post:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
  

  if (!group) {
    return (
      <div className="p-2 flex flex-col items-center">
        <h2 className="text-2xl font-bold">
          Selecciona un grupo para ver su información.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="mt-1 flex-grow flex flex-col h-full">
        <div className="bg-gray-100 p-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <p className="text-sm text-gray-500">
            {group.description || "Sin descripción disponible"}
          </p>
        </div>

        <div className="posts-section flex-grow overflow-y-auto p-4 space-y-4">
          {
            posts?.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                user={user}
                group={group}
                handleEditPost={handleEditPost}
                deletePost={deletePost}
              />
            ))}
        </div>

        {/* Botón para crear post */}
        <div className="p-4 bg-gray-100">
          <Button
            onClick={handleOpenCreatePostModal}
            variant="contained"
            color="primary"
          >
            Crear Post
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 shadow p-4 rounded-r flex flex-col items-center">
        {group && user && group.userId === user.id && (
          <button
            onClick={() => setConfigModalOpen(true)}
            className="flex items-center space-x-2 border border-black rounded-md py-2 px-4 mb-4 w-full justify-center"
          >
            <SettingsIcon />
            <p className="text-sm font-semibold">Configurar grupo</p>
          </button>
        )}

        <h3 className="text-sm font-semibold mb-4">Participantes</h3>
        <ParticipantsList
          participants={participants}
          handleOpenParticipantModal={handleOpenParticipantModal}
        />
      </div>

      {/* Modal de Configuración del Grupo */}
      <ConfigGroupModal
        configModalOpen={configModalOpen}
        setConfigModalOpen={setConfigModalOpen}
        setOpenModal={setOpenModal}
        setEditGroupModalOpen={setEditGroupModalOpen}
      />

      {/* Modal para editar el grupo */}
      <Modal
        open={editGroupModalOpen}
        onClose={() => setEditGroupModalOpen(false)}
      >
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setEditGroupModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            <EditGroup
              editData={group}
              isUpdate={true}
              handleUpdateOrCreate={() => {
                fetchParticipants();
                setEditGroupModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Modal de Añadir Participantes */}
      <AddParticipantsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        allUsers={allUsers}
        participants={participants}
        selectedUsers={selectedUsers}
        handleSelectChange={handleSelectChange}
        handleRemoveUser={handleRemoveUser}
        handleAddParticipants={handleAddParticipants}
      />

      {/* Modal de Participante */}
      <ParticipantModal
        participantModalOpen={participantModalOpen}
        handleCloseParticipantModal={handleCloseParticipantModal}
        selectedParticipant={selectedParticipant}
        group={group}
        user={user}
        handleRemoveParticipant={handleRemoveParticipant}
      />

      {/* Modal de para crear post */}
      <CreatePostModal
        createPostModalOpen={createPostModalOpen}
        handleCloseCreatePostModal={handleCloseCreatePostModal}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        handleCreateOrUpdatePost={handleCreateOrUpdatePost}
        selectedPost={selectedPost}
      />
    </div>
  );
};

export default GroupPanel;
