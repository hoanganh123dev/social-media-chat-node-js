import * as ChatApi from "../api/ChatRequests";

export const createChat = (senderId, receiverId) => async (dispatch) => {
    try {
      const response = await createChat(senderId, receiverId);
      dispatch({ type: "CREATE_CHAT_SUCCESS", payload: response });
    } catch (error) {
      dispatch({ type: "CREATE_CHAT_FAIL", payload: error });
    }
  };
  

export const fetchUserChats = (id) => async (dispatch) => {
    try {
        const response = await ChatApi.userChats(id);
        dispatch({ type: "FETCH_USER_CHATS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "FETCH_USER_CHATS_FAIL", payload: error });
    }
};

export const findChat = (firstId, secondId) => async (dispatch) => {
    try {
        const response = await ChatApi.findChat(firstId, secondId);
        dispatch({ type: "FIND_CHAT_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "FIND_CHAT_FAIL", payload: error });
    }
};
