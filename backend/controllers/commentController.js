import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Obtener todos los comentarios de un post determinado
const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User }, { model: Post }],
    });
    res.json({ message: "Lista de comentarios del post", data: comments });
  } catch (error) {
    console.error("Error al obtener los comentarios del post:", error);
    res.status(500).json({
      message: "Error al obtener los comentarios del post",
      error: error.message,
    });
  }
};

// Crear un nuevo comentario
const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    // Verificar si el usuario y el post existen
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);
    if (!user || !post) {
      return res
        .status(400)
        .json({ message: "El usuario o el post especificado no existe" });
    }

    // Verificar que haya al menos un mensaje o una foto
    if (!content && !image) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar un mensaje o una foto" });
    }

    // Subir la imagen a Cloudinary
    let imageUrl = null;
    if (image) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "comments" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(image);
      });
      imageUrl = result.secure_url;
    }

    const newComment = await Comment.create({
      userId,
      postId,
      content,
      photo: imageUrl,
    });
    res.json({ message: "Comentario creado con éxito", data: newComment });
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    res
      .status(500)
      .json({ message: "Error al crear el comentario", error: error.message });
  }
};

// Actualizar un comentario
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { userId, postId, content } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    // Verificar si el usuario y el post existen
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);
    if (!user || !post) {
      return res
        .status(400)
        .json({ message: "El usuario o el post especificado no existe" });
    }

    // Verificar que haya al menos un mensaje o una foto
    if (!content && !image) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar un mensaje o una foto" });
    }

    // Subir la nueva imagen a Cloudinary si existe
    let imageUrl = null;
    if (image) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "comments" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(image);
      });
      imageUrl = result.secure_url;
    }

    const [updated] = await Comment.update(
      { userId, postId, content, photo: imageUrl },
      { where: { id } }
    );
    if (updated === 0) {
      return res
        .status(404)
        .json({ message: `Comentario con id ${id} no encontrado` });
    }
    const updatedComment = await Comment.findByPk(id);
    res.json({
      message: "Comentario actualizado con éxito",
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error al actualizar el comentario:", error);
    res.status(500).json({
      message: "Error al actualizar el comentario",
      error: error.message,
    });
  }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Comment.destroy({ where: { id } });
    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: `Comentario con id ${id} no encontrado` });
    }
    res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    res.status(500).json({
      message: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};

export {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  upload,
};
