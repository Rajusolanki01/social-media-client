import React, { useState } from "react";
import "./Post.scss";
import Avatar from "../Avatar/Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost,
} from "../../redux/slices/postSlices.js";
import { useNavigate } from "react-router";
import { showToast } from "../../redux/slices/appConfigStore";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
// import IconMenu from "./IconMenu/IconMenu";

function Post({ post, isMyProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handlePostLike = async () => {
   try {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: post.isLiked ? "Unliked" : "Liked",
      })
    );
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
   } catch (error) {
    dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: "Error not Like",
      })
    );
   }
  };

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
     {/*  {isMyProfile ? <IconMenu post={post} /> : null} */}
      <div className="content">
        <img src={post?.image?.url} alt="PostImage" />
      </div>
      <div className="footer">
        <div className="activity">
          <div className="like hover-link" onClick={handlePostLike}>
            {!post.isLiked ? (
              <AiOutlineHeart className="icon" />
            ) : (
              <FcLike className="icon" />
            )}
            <h4>{`${post?.likesCount} Likes`}</h4>
          </div>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
