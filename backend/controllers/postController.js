import Post from '../models/Post.js';
import User from '../models/User.js';
import Group from '../models/Group.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
import Comment from '../models/Comment.js';

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Obtener todos los posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User },
                { model: Group },
            ],
        });
        res.json({ message: 'Lista de posts', data: posts });
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
    }
};

// Obtener un post por su id
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id, {
            include: [
                { model: User },
                { model: Group },
            ],
        });
        if (!post) {
            return res.status(404).json({ message: `Post con id ${id} no encontrado` });
        }
        res.json({ message: 'Post encontrado', data: post });
    } catch (error) {
        console.error('Error al obtener el post:', error);
        res.status(500).json({ message: 'Error al obtener el post', error: error.message });
    }
};

// Obtener todos los posts de un grupo determinado
const getPostsByGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const posts = await Post.findAll({
            where: { groupId },
            include: [
                { model: User },
                { model: Group },
            ],
        });
        res.json({ message: 'Lista de posts del grupo', data: posts });
    } catch (error) {
        console.error('Error al obtener los posts del grupo:', error);
        res.status(500).json({ message: 'Error al obtener los posts del grupo', error: error.message });
    }
};

// Obtener todos los posts de un usuario determinado
const getPostsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.findAll({
            where: { userId },
            include: [
                { model: User },
                { model: Group },
            ],
        });
        res.json({ message: 'Lista de posts del usuario', data: posts });
    } catch (error) {
        console.error('Error al obtener los posts del usuario:', error);
        res.status(500).json({ message: 'Error al obtener los posts del usuario', error: error.message });
    }
};

// Obtener todos los posts de un usuario determinado en un grupo determinado
const getPostsByUserInGroup = async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        const posts = await Post.findAll({
            where: { userId, groupId },
            include: [
                { model: User },
                { model: Group },
            ],
        });
        res.json({ message: 'Lista de posts del usuario en el grupo', data: posts });
    } catch (error) {
        console.error('Error al obtener los posts del usuario en el grupo:', error);
        res.status(500).json({ message: 'Error al obtener los posts del usuario en el grupo', error: error.message });
    }
};

// Crear un nuevo post
const createPost = async (req, res) => {
  const { userId, groupId, content } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    // Verificar si el usuario y el grupo existen
    const user = await User.findByPk(userId);
    const group = await Group.findByPk(groupId);
    if (!user || !group) {
      return res.status(400).json({ message: 'El usuario o el grupo especificado no existe' });
    }

    // Subir la imagen a Cloudinary
    let imageUrl = null;
    if (image) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        stream.end(image);
      });
      imageUrl = result.secure_url;
    }

    const newPost = await Post.create({ userId, groupId, content, photo: imageUrl });
    res.json({ message: 'Post creado con éxito', data: newPost });
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Error al crear el post', error: error.message });
  }
};

// Actualizar un post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId, groupId, content } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    // Verificar si el usuario y el grupo existen
    const user = await User.findByPk(userId);
    const group = await Group.findByPk(groupId);
    if (!user || !group) {
      return res.status(400).json({ message: 'El usuario o el grupo especificado no existe' });
    }

    // Subir la nueva imagen a Cloudinary si existe
    let imageUrl = null;
    if (image) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        stream.end(image);
      });
      imageUrl = result.secure_url;
    }

    const [updated] = await Post.update({ userId, groupId, content, photo: imageUrl }, { where: { id } });
    if (updated === 0) {
      return res.status(404).json({ message: `Post con id ${id} no encontrado` });
    }
    const updatedPost = await Post.findByPk(id);
    res.json({ message: 'Post actualizado con éxito', data: updatedPost });
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
  }
};

// Eliminar un post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminar los comentarios asociados al post
    await Comment.destroy({ where: { postId: id } });

    // Eliminar el post
    const deleted = await Post.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ message: `Post con id ${id} no encontrado` });
    }
    res.json({ message: 'Post eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ message: 'Error al eliminar el post', error: error.message });
  }
};

// Agregar una imagen a un post existente
const addImageToPost = async (req, res) => {
    const { id } = req.params;
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si el post existe
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: `Post con id ${id} no encontrado` });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(image);
            });
            imageUrl = result.secure_url;
        }

        post.photo = imageUrl;
        await post.save();
        res.json({ message: 'Imagen agregada al post con éxito', data: post });
    } catch (error) {
        console.error('Error al agregar la imagen al post:', error);
        res.status(500).json({ message: 'Error al agregar la imagen al post', error: error.message });
    }
};

export { getPosts, getPostById, getPostsByGroup, getPostsByUser, getPostsByUserInGroup, createPost, updatePost, deletePost, addImageToPost, upload };