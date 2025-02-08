import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Avatar, Modal, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import config from "../../utils/config.json";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { toast } from "react-toastify";

const CommentSection = ({ postId, token, group }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentImage, setCommentImage] = useState(null); // Estado para la imagen del comentario
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editedCommentImage, setEditedCommentImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Obtener todos los comentarios
  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/comments/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(
        response.data.data.map((comment) => ({
          ...comment,
          isEditing: false,
          editedContent: comment.content,
        }))
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [postId, token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Agregar un nuevo comentario
  const addComment = async (content) => {
    try {
      setIsLoading(true); // Iniciar la carga
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("postId", postId);
      formData.append("content", content);
      if (commentImage) {
        formData.append("image", commentImage);
      }
  
      await axios.post(`${config.apiUrl}/api/comments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchComments();
      setNewComment("");
      setCommentImage(null);
    } catch (error) {
      console.error("Error adding comment:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al agregar el comentario");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateComment = async (commentId, newContent) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("postId", postId);
      formData.append("content", newContent);
      if (editedCommentImage) {
        formData.append("image", editedCommentImage);
      }
  
      await axios.put(`${config.apiUrl}/api/comments/${commentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchComments();
      setEditedCommentImage(null);
    } catch (error) {
      console.error("Error updating comment:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al actualizar el comentario");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un comentario
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${config.apiUrl}/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCommentImage(file);
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditedCommentImage(file);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border-t">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Comentarios</h3>
      <ul className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="post-item max-w-[650px] bg-white rounded-md shadow-md border border-gray-200 mx-auto"
          >
            {/* Encabezado del Comentario */}
            <div className="flex items-center px-4 py-3">
              <div className="relative rounded-full overflow-hidden shadow-lg mr-3">
                {comment.User.photo ? (
                  <Avatar
                    src={comment.User.photo}
                    alt="Profile Photo"
                    sx={{ width: 20, height: 20 }}
                  />
                ) : (
                  <AccountCircleIcon className="w-10 h-10" />
                )}
              </div>
              <p className="text-sm font-bold text-gray-700">
                <span>{comment.User.name}</span>
                <span className="mx-1">·</span>
              </p>
              <div className="flex flex-col">
                <span className="text-xs text-gray-700">
                  {comment.createdAt !== comment.updatedAt ? (
                    <>
                      {(() => {
                        const now = new Date();
                        const updatedDate = new Date(comment.updatedAt);
                        const diffMs = now - updatedDate;
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
                      const createdDate = new Date(comment.createdAt);
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
                      className="max-w-[80vw] max-h-[80vh] object-contain"
                    />
                  )}
                </div>
              </div>
            </Modal>
            {/* Contenido del Comentario */}
            <div className="mx-12">
              {comment.isEditing ? (
                <>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md"
                    value={comment.editedContent}
                    onChange={(e) =>
                      setComments(
                        comments.map((item) =>
                          item.id === comment.id
                            ? { ...item, editedContent: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <label htmlFor={`edit-file-input-${comment.id}`}>
                      <IconButton component="span" size="small">
                        <AttachFileIcon fontSize="inherit" />
                      </IconButton>
                    </label>
                    <input
                      id={`edit-file-input-${comment.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditFileChange}
                    />
                    <IconButton
                      onClick={() =>
                        updateComment(comment.id, comment.editedContent)
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setComments(
                          comments.map((item) =>
                            item.id === comment.id
                              ? { ...item, isEditing: false }
                              : item
                          )
                        );
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700">{comment.content}</p>
                  {comment.photo && (
                    <div>
                      <img
                        src={comment.photo}
                        alt="Comentario"
                        className="mt-2 cursor-pointer max-w-[150px]"
                        onClick={() => handleImageClick(comment.photo)}
                      />
                    </div>
                  )}
                  <div className="flex gap-2 justify-end mt-2">
                    {(user.id === comment.User.id || group === "admin") && (
                      <>
                        <IconButton
                          onClick={() => {
                            setComments(
                              comments.map((item) =>
                                item.id === comment.id
                                  ? { ...item, isEditing: true }
                                  : item
                              )
                            );
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteComment(comment.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </ul>

      {/* Nuevo comentario */}
      <div className="mt-6">
        <textarea
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <label htmlFor="file-input">
            <IconButton component="span" size="small">
              <AttachFileIcon fontSize="inherit" />
            </IconButton>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            onClick={() => addComment(newComment)}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Comentar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
