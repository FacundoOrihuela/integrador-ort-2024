import News from '../models/News.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('photo');

// Obtener todas las noticias
const getNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.json({ message: 'Lista de noticias', data: news });
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
        res.status(500).json({ message: 'Error al obtener las noticias', error: error.message });
    }
};

// Obtener una noticia por su ID
const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.findByPk(id);
        if (!news) {
            return res.status(404).json({ message: `Noticia con id ${id} no encontrada` });
        }
        res.json({ message: 'Noticia obtenida con éxito', data: news });
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        res.status(500).json({ message: 'Error al obtener la noticia', error: error.message });
    }
};

// Crear una nueva noticia
const createNews = async (req, res) => {
    const { title, content } = req.body;
    const photo = req.file ? req.file.buffer : null;

    try {
        let photoUrl = null;
        if (photo) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'news', resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(photo);
            });
            photoUrl = result.secure_url;
        }

        const newNews = await News.create({ title, content, photo: photoUrl });
        res.json({ message: 'Noticia creada con éxito', data: newNews });
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        res.status(500).json({ message: 'Error al crear la noticia', error: error.message });
    }
};

// Actualizar una noticia
const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const photo = req.file ? req.file.buffer : null;

    try {

        // Obtener la noticia existente
        const existingNew = await News.findByPk(id);
        if (!existingNew) {
            return res.status(404).json({ message: `Noticia con id ${id} no encontrada` });
        }

        let photoUrl = existingNew.photo;
        if (photo) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'news', resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(photo);
            });
            photoUrl = result.secure_url;
        }

        const [updated] = await News.update({ title, content, photo: photoUrl }, { where: { id }, returning: true });
        if (updated === 0) {
            return res.status(404).json({ message: `Noticia con id ${id} no encontrada` });
        }
        const updatedNews = await News.findByPk(id);
        res.json({ message: 'Noticia actualizada con éxito', data: updatedNews });
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        res.status(500).json({ message: 'Error al actualizar la noticia', error: error.message });
    }
};

// Eliminar una noticia
const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await News.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: `Noticia con id ${id} no encontrada` });
        }
        res.json({ message: 'Noticia eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        res.status(500).json({ message: 'Error al eliminar la noticia', error: error.message });
    }
};

export { getNews, getNewsById, createNews, updateNews, deleteNews, upload };