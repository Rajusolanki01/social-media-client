import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Post from "../Post/Post";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlices";
import FollowButton from "../FollowButton/FollowButton";
import { followAndUnfollow } from "../../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams(); //? Found all Params...
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [feedData, params.userId, myProfile, dispatch]);

  function handleUserFollowAndUnfollow() {
    dispatch(
      followAndUnfollow({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <div className="Profile">
      <div className="container ">
        <div className="left-part">
          {isMyProfile ? <CreatePost /> : " "}

          {userProfile?.posts?.length === 0 ? (
            <p className="no-uploads-message">No uploads yet...</p>
          ) : (
            userProfile?.posts?.map((post) => (
              <Post key={post._id} post={post} isMyProfile={isMyProfile} />
            ))
          )}
        </div>
        <div className="right-part ">
          <div className="profile-card  follow-link ">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <div className="follower-info">
              <h4 className="heading hover-link">{`${
                userProfile?.followers?.length || 0
              } Followers`}</h4>
              <h4 className="heading hover-link">{`${
                userProfile?.followings?.length || 0
              } Followings`}</h4>
              <h4 className="heading">{`${
                userProfile?.posts?.length || 0
              } Posts`}</h4>
            </div>
            {!isMyProfile && (
              <FollowButton
                isFollowing={isFollowing}
                onFollowToggle={handleUserFollowAndUnfollow}
              />
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}>
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
