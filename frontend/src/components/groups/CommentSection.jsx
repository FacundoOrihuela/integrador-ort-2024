import React, { useContext, useEffect, useState } from "react";
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

const CommentSection = ({ postId, token, group }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editedCommentImage, setEditedCommentImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId, token]);

  const fetchComments = async () => {
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
  };

  const addComment = async (content) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("postId", postId);
      formData.append("content", content);
      if (commentImage) {
        formData.append("image", commentImage);
      }

      const response = await axios.post(
        `${config.apiUrl}/api/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchComments();
      setNewComment("");
      setCommentImage(null);
    } catch (error) {
      console.error("Error adding comment:", error);
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

      const response = await axios.put(
        `${config.apiUrl}/api/comments/${commentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchComments();
      setEditedCommentImage(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="post-item bg-white rounded-md shadow-md border border-gray-200 mx-auto"
          >
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

            <div className="mx-4">
              {comment.isEditing ? (
                <>
                  <textarea
                    value={comment.editedContent}
                    onChange={(e) =>
                      setComments(
                        comments.map((c) =>
                          c.id === comment.id
                            ? { ...c, editedContent: e.target.value }
                            : c
                        )
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <div className="flex items-center justify-between bg-gray-100 p-2 mt-2 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                        style={{ display: "none" }}
                        id={`edit-comment-image-upload-${comment.id}`}
                      />
                      <label
                        htmlFor={`edit-comment-image-upload-${comment.id}`}
                      >
                        <IconButton component="span">
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                      {editedCommentImage && (
                        <span className="ml-2 text-sm text-gray-600">
                          {editedCommentImage.name}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-left">{comment.content}</p>
              )}
              {comment.photo && (
                <img
                  src={comment.photo}
                  alt="Comentario"
                  className="w-full max-h-64 object-contain rounded-md cursor-pointer"
                  onClick={() => handleImageClick(comment.photo)}
                />
              )}
            </div>

            <div className="flex justify-between items-center px-3 pb-3">
              {user &&
                (comment.userId === user.id || group.userId === user.id) && (
                  <div>
                    {comment.isEditing ? (
                      <>
                        <IconButton
                          onClick={() =>
                            updateComment(comment.id, comment.editedContent)
                          }
                          aria-label="Guardar"
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setComments(
                              comments.map((c) =>
                                c.id === comment.id
                                  ? { ...c, isEditing: false }
                                  : c
                              )
                            );
                          }}
                          aria-label="Cancelar"
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() =>
                            setComments(
                              comments.map((c) =>
                                c.id === comment.id
                                  ? { ...c, isEditing: true }
                                  : c
                              )
                            )
                          }
                          aria-label="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteComment(comment.id)}
                          aria-label="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
      </ul>

      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Escribe un comentario..."
        />
        <div className="flex justify-end items-center mt-2">
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="comment-image-upload"
            />
            <label htmlFor="comment-image-upload">
              <IconButton component="span">
                <AttachFileIcon />
              </IconButton>
            </label>
            {commentImage && (
              <span className="ml-2 text-sm text-gray-600">
                {commentImage.name}
              </span>
            )}
          </div>
          <button
            onClick={() => addComment(newComment)}
            disabled={isLoading}
            className="px-6 py-2 bg-colors-1 text-white rounded-md ml-2 disabled:bg-gray-400"
          >
            {isLoading ? "Cargando..." : "Comentar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
