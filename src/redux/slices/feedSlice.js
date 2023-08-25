import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigStore";
import { likeAndUnlikePost } from "./postSlices";

export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getFeedData");
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const followAndUnfollow = createAsyncThunk(
  "user/followAndUnfollow",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/followAndUnfollow", body);
      return response.result.user;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        console.error("Error while Get Feed Data Recieved:", action.error);
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload; // Updated post object with like status//
        // Find the index of the updated post in the user's posts array
        const postIndex = state?.feedData?.posts?.findIndex(
          (item) => item._id === updatedPost._id
        );
  
        if (postIndex !== undefined && postIndex !== -1) {
          // Replace the post with the updated post in the user's posts array
          state.feedData.posts[postIndex] = updatedPost;
        }
      })
      .addCase(likeAndUnlikePost.rejected, (state, action) => {
        console.error("Error while liking/unliking post:", action.error);
      })
      .addCase(followAndUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const userIndex = state?.feedData?.followings?.findIndex(item => item._id === user._id);
      
        if (userIndex !== -1) {
          state?.feedData?.followings.splice(userIndex, 1);
        } else { 
          state?.feedData?.followings.push(user);
        }
      })
      .addCase(followAndUnfollow.rejected, (state, action) => {
        console.error("Error while Follow/Unfollow User:", action.error);
      });
      
  },
});

export default feedSlice.reducer;
