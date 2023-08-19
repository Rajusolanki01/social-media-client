import React from 'react';
const FollowButton = ({ isFollowing, onFollowToggle }) => {
  const buttonClass = isFollowing ? "btn-secondary btn-secondary-1 follow-link" : "btn-primary btn-primary-1 follow-link";
  const buttonText = isFollowing ? "Unfollow" : "Follow";

  return (
    <h6  onClick={onFollowToggle} className={`follow-button ${buttonClass}`}>
      {buttonText}
    </h6>
  );
};

export default FollowButton;
