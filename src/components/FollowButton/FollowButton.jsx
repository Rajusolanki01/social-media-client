import React from 'react';
const FollowButton = ({ isFollowing, onFollowToggle }) => {
  const buttonClass = isFollowing ? "btn-secondary follow-link" : "btn-primary follow-link";
  const buttonText = isFollowing ? "Unfollow" : "Follow";

  return (
    <h6  onClick={onFollowToggle} className={`follow-button ${buttonClass}`}>
      {buttonText}
    </h6>
  );
};

export default FollowButton;
