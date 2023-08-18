import React, { useEffect, useState } from "react";
import "./Follower.scss";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollow } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router";
import FollowButton from "../FollowButton/FollowButton";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigStore";

function Follower({ user }) {
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData, user._id]);

  function handleUserFollowAndUnfollow() {
  
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: isFollowing ? `Unfollowed ${user.name}` : `Followed ${user.name}`,
      })
    );


    dispatch(
      followAndUnfollow({
        userIdToFollow: user._id,
      })
    );
  }

  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
        <FollowButton 
          isFollowing={isFollowing}
          onFollowToggle={handleUserFollowAndUnfollow}
        />
  
    </div>
  );
}

export default Follower;
