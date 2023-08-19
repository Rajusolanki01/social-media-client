import React, { useEffect, useState } from "react";
import "./CreatePost.scss";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading, showToast } from "../../redux/slices/appConfigStore";
import { getUserProfile } from "../../redux/slices/postSlices";
import { TOAST_SUCCESS, TOAST_FAILURE } from "../../App";

function CreatePost() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [caption, setCaption] = useState("");
  const [postImg, setPostImg] = useState("");
  const dispatch = useDispatch();

  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }

  const handlePostSubmit = async () => {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Post Created!",
        })
      );
      dispatch(
        getUserProfile({
          userId: myProfile?._id,
        })
      );
      // Clear the caption and postImg after successful submission
      setCaption("");
      setPostImg("");
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: "Caption and Image is Required!",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="CreatePost">
    <div className="left-part-1">
      <Avatar src={myProfile?.avatar?.url} />
    </div>
    <div className="right-part-1">
      <input
        value={caption}
        type="text"
        className="captionInput"
        placeholder="what's on your mind ?"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      {postImg && (
        <div className="img-container">
          <img className="post-img" src={postImg} alt="post-img" />
        </div>
      )}
      <div className="bottom-part">
        <div className="input-post-img">
          <label htmlFor="inputImg" className="label-img">
            <BsCardImage />
          </label>
          <input
            className="inputImg"
            id="inputImg"
            type="file"
            accept="image/*"
            onChange={handleImgChange}
          />
        </div>
        <button className="post-btn btn-primary" onClick={handlePostSubmit}>
          Post
        </button>
      </div>
    </div>
  </div>
  );
}

export default CreatePost;
