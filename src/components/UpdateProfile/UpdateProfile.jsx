import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import userImgg from "../../assests/account.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  showToast,
  updateMyProfile,
} from "../../redux/slices/appConfigStore";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/LocalStorageManager";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setName(myProfile?.name || " ");
    setBio(myProfile?.bio || " ");
    setUserImg(myProfile?.avatar?.url || userImgg);
  }, [myProfile]);

  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );

    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "Profile Updated",
      })
    );
  }

  function handleDeleteConfirm() {
    setShowDeleteConfirm(true);
  }

  function handleDeleteCancel() {
    setShowDeleteConfirm(false);
  }

  async function handleDeleteAccount() {
    try {
      dispatch(setLoading(true));
      await axiosClient.delete("/user/deleteProfile");
      dispatch(setLoading(false));
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: " User Deleted Successfully!'",
        })
      );
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/signup");
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: error,
        })
      );
    }
  }

  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="userImg" className="labelImg">
              <img src={userImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="userImg"
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              className="inputImg2"
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              style={{ marginTop: "15px" }}
              className="btn-primary btn-primary-1"
              onClick={handleSubmit}>
              Submit
            </button>
          </form>
          <button
            className="delete-btn btn-secondary btn-secondary-1"
            onClick={handleDeleteConfirm}>
            Delete Account
          </button>
          {showDeleteConfirm && (
            <div className="delete-confirm-overlay">
              <div className="delete-confirm">
                <p>Are you sure you want to delete your account ?</p>
                <div className="inside-button">
                  <button
                    className="btn-secondary btn-secondary-1"
                    onClick={handleDeleteAccount}>
                    Yes
                  </button>
                  <button
                    className="btn-secondary btn-secondary-1"
                    onClick={handleDeleteCancel}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
