import React, { useState, useEffect } from "react";
import "./Post.css";
import CommentIcon from "../../img/comment.png";
import ShareIcon from "../../img/share.png";
import LikeIcon from "../../img/like.png";
import NotLikeIcon from "../../img/notlike.png";
import DeleteIcon from "../../img/delete.png"; // Thêm icon cho nút xóa
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { createComment, getAllComments, deleteComment } from "../../api/CommentRequests";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Khi component được load, lấy tất cả các comment từ server
    const fetchComments = async () => {
      try {
        const comments = await getAllComments();
        setComments(comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleCommentSubmit = async () => {
    try {
      // Gửi comment lên server
      await createComment(data._id, user._id, commentText);
      // Lấy lại danh sách comment từ server sau khi gửi comment thành công
      const updatedComments = await getAllComments();
      setComments(updatedComments);
      // Đặt lại trạng thái của comment box và xóa nội dung comment sau khi submit
      setShowCommentBox(false);
      setCommentText("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Gọi hàm để xóa comment từ server
      await deleteComment(commentId);
      // Lấy lại danh sách comment từ server sau khi xóa comment thành công
      const updatedComments = await getAllComments();
      setComments(updatedComments);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? LikeIcon : NotLikeIcon}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={CommentIcon}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleCommentClick}
        />
        <img src={ShareIcon} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>

      {showCommentBox && (
        <div className="commentBox">
          <input
            type="text"
            placeholder="Type your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      )}

      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <span>{comment.text}</span>
          {comment.userId === user._id && (
            <img
              src={DeleteIcon}
              alt=""
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                width: "20px", 
                height: "20px", 
              }}
              onClick={() => handleDeleteComment(comment._id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;
