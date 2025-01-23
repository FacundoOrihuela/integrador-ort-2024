import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Avatar, IconButton, } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import config from "../../utils/config.json"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const CommentSection = ({ postId, token, group }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);

  // Obtener todos los comentarios
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

  // Agregar un nuevo comentario
  const addComment = async (content) => {
    try {
      const response = await axios.post(
       `${config.apiUrl}/api/comments`,
        {
          userId: user.id,
          postId: postId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Actualizar un comentario
  const updateComment = async (commentId, newContent) => {
    try {
      const response = await axios.put(
        `${config.apiUrl}/api/comments/${commentId}`,
        {
          userId: user.id,
          postId: postId,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments()
    } catch (error) {
      console.error("Error updating comment:", error);
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

            {/* Contenido del Comentario */}
            <div className="mx-12">
              {comment.isEditing ? (
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
              ) : (
                <p className="text-left">{comment.content}</p>
              )}
            </div>

            {/* Controles del Comentario */}
            <div className="flex justify-between items-center px-3 pb-3">
              <div className="flex items-center space-x-2"></div>
              {user &&
                (comment.userId === user.id || group.userId === user.id) && (
                  <div>
                    {comment.isEditing ? (
                      <>
                        <IconButton
                          onClick={() =>
                            updateComment(comment.id, comment.editedContent)
                          }
                          color="inherit"
                        >
                          <CheckIcon/>
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            setComments(
                              comments.map((c) =>
                                c.id === comment.id
                                  ? { ...c, isEditing: false }
                                  : c
                              )
                            )
                          }
                          color="inherit"
                        >
                          <CloseIcon/>
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
                          color="inherit"
                          >
                          <EditIcon/>
                        </IconButton>
                        <IconButton
                          onClick={() => deleteComment(comment.id)}
                          color="inherit"
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(newComment);
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
  );
};

export default CommentSection;
