import React from 'react';
const FollowButton = ({ isFollowing, onFollowToggle }) => {
  const buttonClass = isFollowing ? "btn-secondary Button-Second-1 follow-link" : "btn-primary Button-1 follow-link";
  const buttonText = isFollowing ? "Unfollow" : "Follow";

  return (
    <h6  onClick={onFollowToggle} className={`follow-button ${buttonClass}`}>
      {buttonText}
    </h6>
  );
};

export default FollowButton;
