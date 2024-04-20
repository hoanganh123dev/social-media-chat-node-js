import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = async (senderId, receiverId) => {
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        senderId: senderId,
        receiverId: receiverId
      });
      return response.data; // Trả về dữ liệu từ phản hồi (ID của cuộc trò chuyện mới)
    } catch (error) {
      throw error; // Ném ra lỗi nếu có lỗi xảy ra
    }
  };

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);