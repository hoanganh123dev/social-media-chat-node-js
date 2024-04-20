import CommentModel from '../models/commentModel.js';

// Tạo bình luận mới
export const createComment = async (req, res) => {
  const { postId, userId, text } = req.body;

  try {
    const newComment = new CommentModel({ postId, userId, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error: error.message });
  }
};

// Lấy tất cả các bình luận
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};
// Lấy tất cả các bình luận của một post dựa trên postId
export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await CommentModel.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments by postId", error: error.message });
  }
};

// Lấy bình luận theo id
export const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await CommentModel.findById(id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comment", error: error.message });
  }
};

// Cập nhật bình luận
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json(updatedComment);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error: error.message });
  }
};

// Xóa bình luận
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
  }
};
