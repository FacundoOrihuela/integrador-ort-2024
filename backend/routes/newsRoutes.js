import { Router } from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews, upload } from '../controllers/newsController.js';

const router = Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', upload, createNews);
router.put('/:id', upload, updateNews);
router.delete('/:id', deleteNews);

export default router;