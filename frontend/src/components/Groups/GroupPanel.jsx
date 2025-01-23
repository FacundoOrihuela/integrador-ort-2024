import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/ModeComment";
import {
  Avatar,
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../context/UserContext";
import EditGroup from "./EditGroup";
import CommentSection from "./CommentSection";
import config from "../../utils/config.json";

const GroupPanel = ({ group }) => {
  const [participants, setParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsCount, setCommentsCount] = useState({});

  const loadInfoAsync = async () => {
    await fetchParticipants();
    await fetchAllUsers();
  };

  useEffect(() => {
    loadInfoAsync();
  }, [group, token]);

  useEffect(() => {
    if (group) {
      fetchPosts();
    }
  }, [group]);

  useEffect(() => {
    fetchCommentsCounts();
  }, [posts, token]);

  const fetchCommentsCounts = async () => {
    try {
      const counts = {};
      for (const post of posts) {
        const response = await axios.get(
          `${config.apiUrl}/api/comments/post/${post.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        counts[post.id] = response.data.data.length;
      }
      setCommentsCount(counts);
    } catch (error) {
      console.error("Error fetching comments count:", error);
    }
  };

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${config.apiUrl}/api/user/all`, {
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
        `${config.apiUrl}/api/groups/${group.id}/users`,
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

  const handleOpenPostModal = (post) => {
    setSelectedPost(post);
    setPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
    setPostModalOpen(false);
    fetchCommentsCounts()
  };

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const handleCommentModalClose = () => {
    setIsCommentModalOpen(false);
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
      const response = await fetch(`${config.apiUrl}/api/groups/remove-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groupId: group.id,
          userId: selectedParticipant.id,
        }),
      });

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
        const response = await fetch(`${config.apiUrl}/api/groups/add-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId: group.id,
            userId: selectedUser.id,
          }),
        });

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

  // Agregar un nuevo comentario
  const addComment = async (content) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/comments`,
        {
          userId: user.id,
          postId: selectedPost.id,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setNewComment("");
    fetchCommentsCounts()
  };

  // Obtener todos los posts del grupo
  const fetchPosts = async () => {
    if (!group) return;
    try {
      const response = await fetch(
        `${config.apiUrl}/api/posts/group/${group.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data.data.reverse());
      } else {
        console.error("Error al obtener los posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleFileChange = (e) => {
    setNewPostImage(e.target.files[0]);
  };

  // Crear un nuevo post
  const createPost = async (content) => {
    try {
      const formData = new FormData();
      console.log("user.id:", user.id);
      console.log("group.id:", group.id);
      console.log("content:", content);
      console.log("newPostImage:", newPostImage);

      formData.append("userId", user.id);
      formData.append("groupId", group.id);
      formData.append("content", content);
      if (newPostImage) {
        formData.append("photo", newPostImage);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await fetch(`${config.apiUrl}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        await fetchPosts();
      } else {
        const errorData = await response.json();
        console.error("Error al crear el post:", errorData.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Actualizar un post
  const updatePost = async (post, content) => {
    try {
      const formData = new FormData();
      formData.append("userId", post.userId);
      formData.append("groupId", post.groupId);
      formData.append("content", content);
      if (newPostImage) {
        formData.append("photo", newPostImage);
      }

      const response = await fetch(`${config.apiUrl}/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        await fetchPosts();
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el post:", errorData.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Eliminar un post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Error al eliminar el post:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
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

        {/* Botón para crear post */}

        <div className="posts-section flex-grow overflow-y-auto p-4 space-y-4">
          <div className="p-4 max-w-[650px] rounded-md shadow-md border border-gray-200 bg-gray-200 mx-auto">
            <Button
              onClick={handleOpenCreatePostModal}
              variant="contained"
              color="primary"
            >
              Crear Post
            </Button>
          </div>
          {posts?.map((post) => (
            <div
              key={post.id}
              className="post-item max-w-[650px] bg-white rounded-md shadow-md border border-gray-200 mx-auto"
            >
              {/* Encabezado del Post */}
              <div className="flex items-center px-4 py-3 border-b border-gray-200">
                <div
                  className="relative rounded-full overflow-hidden shadow-lg mr-3"
                  whileHover={{ scale: 1.1 }}
                >
                  {post.User.photo ? (
                    <Avatar
                      src={post.User.photo}
                      alt="Profile Photo"
                      sx={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <AccountCircleIcon className="w-10 h-10" />
                  )}
                </div>
                <p className="text-sm font-bold text-gray-700">
                  <span>{post.User.name}</span>
                  <span className="mx-1">·</span>
                </p>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">
                    {post.createdAt !== post.updatedAt ? (
                      <>
                        {(() => {
                          const now = new Date();
                          const updatedDate = new Date(post.updatedAt);
                          const diffMs = now - updatedDate;
                          const diffHours = Math.floor(
                            diffMs / (1000 * 60 * 60)
                          );
                          const diffMinutes = Math.floor(diffMs / (1000 * 60));

                          if (diffHours < 1) {
                            return `Hace ${diffMinutes} minuto${
                              diffMinutes !== 1 ? "s" : ""
                            }`;
                          } else if (diffHours < 24) {
                            return `Hace ${diffHours} hora${
                              diffHours !== 1 ? "s" : ""
                            }`;
                          } else {
                            return updatedDate.toLocaleString("es-ES", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            });
                          }
                        })()}
                        <span className="ml-1 text-xs text-gray-400">
                          (editado)
                        </span>
                      </>
                    ) : (
                      (() => {
                        const now = new Date();
                        const createdDate = new Date(post.createdAt);
                        const diffMs = now - createdDate;
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffMinutes = Math.floor(diffMs / (1000 * 60));

                        if (diffHours < 1) {
                          return `Hace ${diffMinutes} minuto${
                            diffMinutes !== 1 ? "s" : ""
                          }`;
                        } else if (diffHours < 24) {
                          return `Hace ${diffHours} hora${
                            diffHours !== 1 ? "s" : ""
                          }`;
                        } else {
                          return createdDate.toLocaleString("es-ES", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          });
                        }
                      })()
                    )}
                  </span>
                </div>
              </div>

              {/* Contenido del Post */}
              <div
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleOpenPostModal(post)}
              >
                <div className="p-4 mx-20">
                  <p className="mb-2 text-left">{post.content}</p>
                  {post.photo && (
                    <img
                      src={post.photo}
                      alt="Post"
                      className="w-auto max-h-64 object-contain rounded-md"
                    />
                  )}
                </div>
              </div>

              {/* Controles del Post */}
              <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <CommentIcon
                    onClick={() => handleCommentClick(post)}
                    className="cursor-pointer text-gray-600"
                    size="small"
                  />
                  {commentsCount[post.id] > 0 && (
                    <span className="text-gray-600 text-sm">
                      {commentsCount[post.id]}
                    </span>
                  )}
                </div>
                {user &&
                  (post.userId === user.id || group.userId === user.id) && (
                    <div className="flex space-x-2">
                      <IconButton
                        onClick={() => handleEditPost(post)}
                        color="inherit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deletePost(post.id)}
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
              </div>
            </div>
          ))}
          <Modal open={imageModalOpen} onClose={handleCloseImageModal}>
            <div
              className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50"
              onClick={handleCloseImageModal}
            >
              <div
                className="bg-white p-6 rounded-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                <CloseIcon
                  onClick={handleCloseImageModal}
                  className="absolute top-2 right-2 cursor-pointer text-black bg-white rounded-full p-1"
                  style={{ fontSize: 30 }}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Ampliada"
                    className="max-w-full max-h-screen object-contain"
                  />
                )}
              </div>
            </div>
          </Modal>
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
        <div className="flex flex-col gap-4">
          {participants?.map((participant) => (
            <div key={participant.id} className="flex flex-col items-center">
              <motion.div
                className="relative rounded-full overflow-hidden shadow-lg cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleOpenParticipantModal(participant)}
              >
                {participant.photo ? (
                  <Avatar
                    src={participant.photo}
                    alt="Profile Photo"
                    className="h-full w-full"
                    sx={{ width: 20, height: 20 }}
                  />
                ) : (
                  <AccountCircleIcon className="w-full h-full" />
                )}
              </motion.div>
              <p className="text-xs font-bold text-gray-700">
                {participant.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Configuración del Grupo */}
      <Modal open={configModalOpen} onClose={() => setConfigModalOpen(false)}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setConfigModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            <h3 className="text-xl font-semibold mb-4">Configurar grupo</h3>
            <div className="flex flex-col gap-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Añadir participantes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditGroupModalOpen(true)}
              >
                Editar grupo
              </Button>
            </div>
          </div>
        </div>
      </Modal>

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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />

            <h3 className="text-xl font-semibold mb-4">
              Selecciona los participantes
            </h3>
            <FormControl fullWidth>
              <InputLabel id="select-participants-label">
                {allUsers.filter(
                  (user) => !participants.some((p) => p.id === user.id)
                ).length > 0
                  ? "Participantes"
                  : "No hay usuarios para seleccionar"}
              </InputLabel>
              <Select
                labelId="select-participants-label"
                multiple
                value={selectedUsers?.map((user) => user.id)}
                onChange={handleSelectChange}
                disabled={false}
              >
                {allUsers?.filter(
                  (user) =>
                    !participants.some(
                      (participant) => participant.id === user.id
                    )
                ).length > 0 ? (
                  allUsers
                    .filter(
                      (user) =>
                        !participants.some(
                          (participant) => participant.id === user.id
                        )
                    )
                    .map((user) => (
                      <MenuItem
                        key={user.id}
                        value={user.id}
                        disabled={selectedUsers.some((u) => u.id === user.id)}
                      >
                        {user.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>No hay usuarios para seleccionar</MenuItem>
                )}
              </Select>
            </FormControl>
            <div className="mt-4">
              <h4 className="font-semibold text-lg">Usuarios seleccionados</h4>
              <ul
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {selectedUsers?.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center"
                  >
                    <span>{user.name}</span>
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleRemoveUser(user.id)}
                    />
                  </li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddParticipants}
                className="mt-4"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal de Participante */}
      <Modal open={participantModalOpen} onClose={handleCloseParticipantModal}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={handleCloseParticipantModal}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            {selectedParticipant && (
              <>
                <div className="flex flex-col gap-4">
                  <h2>Opciones para {selectedParticipant.name}</h2>
                  {group.userId !== selectedParticipant.id &&
                    user.id === group.userId && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleRemoveParticipant}
                      >
                        Eliminar usuario del grupo
                      </Button>
                    )}
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`/profile/${selectedParticipant.id}`}
                  >
                    Ir al perfil
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal de para crear post */}
      <Modal open={createPostModalOpen} onClose={handleCloseCreatePostModal}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <CloseIcon
              onClick={handleCloseCreatePostModal}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            <h3 className="text-xl font-semibold mb-4">
              {selectedPost ? "Editar post" : "Crear nuevo post"}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              rows="4"
              placeholder="Escribe aquí el contenido del post..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCloseCreatePostModal}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateOrUpdatePost}
              >
                {selectedPost ? "Confirmar" : "Publicar"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal para posts con comentarios */}
      <Modal open={postModalOpen} onClose={handleClosePostModal}>
        <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
          <div
            className="bg-white p-4 rounded-lg max-w-[650px] w-full h-[80%] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon
              onClick={handleClosePostModal}
              className="absolute top-2 right-2 cursor-pointer text-black"
              style={{ fontSize: 30 }}
            />
            {selectedPost && (
              <>
                {/* Encabezado del Post */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200">
                  <div className="relative rounded-full overflow-hidden shadow-lg mr-3">
                    {selectedPost.User.photo ? (
                      <Avatar
                        src={selectedPost.User.photo}
                        alt="Profile Photo"
                        sx={{ width: 20, height: 20 }}
                      />
                    ) : (
                      <AccountCircleIcon className="w-10 h-10" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    <span>{selectedPost.User.name}</span>
                    <span className="mx-1">·</span>
                  </p>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-700">
                      {selectedPost.createdAt !== selectedPost.updatedAt ? (
                        <>
                          {(() => {
                            const now = new Date();
                            const updatedDate = new Date(
                              selectedPost.updatedAt
                            );
                            const diffMs = now - updatedDate;
                            const diffHours = Math.floor(
                              diffMs / (1000 * 60 * 60)
                            );
                            const diffMinutes = Math.floor(
                              diffMs / (1000 * 60)
                            );

                            if (diffHours < 1) {
                              return `Hace ${diffMinutes} minuto${
                                diffMinutes !== 1 ? "s" : ""
                              }`;
                            } else if (diffHours < 24) {
                              return `Hace ${diffHours} hora${
                                diffHours !== 1 ? "s" : ""
                              }`;
                            } else {
                              return updatedDate.toLocaleString("es-ES", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              });
                            }
                          })()}
                          <span className="ml-1 text-xs text-gray-400">
                            (editado)
                          </span>
                        </>
                      ) : (
                        (() => {
                          const now = new Date();
                          const createdDate = new Date(selectedPost.createdAt);
                          const diffMs = now - createdDate;
                          const diffHours = Math.floor(
                            diffMs / (1000 * 60 * 60)
                          );
                          const diffMinutes = Math.floor(diffMs / (1000 * 60));

                          if (diffHours < 1) {
                            return `Hace ${diffMinutes} minuto${
                              diffMinutes !== 1 ? "s" : ""
                            }`;
                          } else if (diffHours < 24) {
                            return `Hace ${diffHours} hora${
                              diffHours !== 1 ? "s" : ""
                            }`;
                          } else {
                            return createdDate.toLocaleString("es-ES", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            });
                          }
                        })()
                      )}
                    </span>
                  </div>
                </div>

                {/* Contenido del Post */}
                <div className="p-4 mx-4">
                  <p className="mb-2 text-left">{selectedPost.content}</p>
                  {selectedPost.photo && (
                    <img
                      src={selectedPost.photo}
                      alt="Post"
                      className="w-auto max-h-64 object-contain rounded-md cursor-pointer"
                      onClick={() => handleImageClick(selectedPost.photo)}
                    />
                  )}
                </div>

                <div className="mt-6">
                  <CommentSection
                    postId={selectedPost.id}
                    token={token}
                    group={group}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal open={isCommentModalOpen} onClose={handleCommentModalClose}>
        <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-20 relative">
          <CloseIcon
            onClick={handleCommentModalClose}
            className="absolute top-2 right-2 cursor-pointer text-black"
            style={{ fontSize: 30 }}
          />
          <h3 className="text-lg font-semibold mb-4">Agregar un comentario</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment(newComment);
              handleCommentModalClose();
            }}
            className="mt-4"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 w-full py-1 bg-colors-1 text-white text-sm font-medium rounded-md hover:bg-colors-1 hover:brightness-90 transition"
            >
              Agregar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default GroupPanel;
