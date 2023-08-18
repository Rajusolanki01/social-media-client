import React, { useEffect } from "react";
import "./Feed.scss";
import Follower from "../Follower/Follower";
import Post from "../Post/Post"
import CreatePost from "../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";

function Feed() {
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData())
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          <CreatePost />
          {feedData?.posts?.map((post) => <Post  key={post?._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are Following</h3>
           {feedData?.followings?.map((user) => <Follower key={user?._id} user={user}  />)}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggested For You</h3>
            {feedData?.suggestions?.map((user) => <Follower key={user?._id} user={user}  />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
