import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Tạo bình luận mới
export const createComment = async (postId, userId, text) => {
  try {
    const { data } = await API.post('/comments', { postId, userId, text });
    return data;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả các bình luận
export const getAllComments = async () => {
  try {
    const { data } = await API.get('/comments');
    return data;
  } catch (error) {
    throw error;
  }
};

// Lấy bình luận theo ID
export const getCommentById = async (id) => {
  try {
    const { data } = await API.get(`/comments/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật bình luận
export const updateComment = async (id, newText) => {
  try {
    const { data } = await API.put(`/comments/${id}`, { text: newText });
    return data;
  } catch (error) {
    throw error;
  }
};

// Xóa bình luận
export const deleteComment = async (id) => {
  try {
    const { data } = await API.delete(`/comments/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
