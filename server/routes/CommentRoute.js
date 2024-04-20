import express from 'express';
import { createComment, getAllComments,getCommentsByPostId , getCommentById, updateComment, deleteComment } from '../controllers/CommentController.js';

const router = express.Router();

// Định nghĩa các route cho comment
router.post('/', createComment); // Tạo mới bình luận
router.get('/', getAllComments); // Lấy tất cả bình luận
router.get('/:id', getCommentById); // Lấy bình luận theo ID
router.put('/:id', updateComment); // Cập nhật bình luận theo ID
router.delete('/:id', deleteComment); // Xóa bình luận theo ID
// Định nghĩa route để lấy các comment theo post ID
router.get('/:postId', getCommentsByPostId);

export default router;
