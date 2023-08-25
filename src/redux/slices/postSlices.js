import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigStore";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getUserProfile", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "posts/likeAndUnlike",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/likeAndUnlike", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

  // export const addPostComment = createAsyncThunk(
  //   "posts/comment",
  //   async (body, thunkAPI) => {
  //     try {
  //       thunkAPI.dispatch(setLoading(true));
  //       const response = await axiosClient.post("/posts/comment", body);
  //       return response.data.result.user;
  //     } catch (error) {
  //       return Promise.reject(error);
  //     } finally {
  //       thunkAPI.dispatch(setLoading(false));
  //     }
  //   }
  // );

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (body, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));
//       const postResponse = await axiosClient.delete("/posts/delete", body);
//       return postResponse.result;
//     } catch (error) {
//       return Promise.reject(error);
//     } finally {
//       thunkAPI.dispatch(setLoading(false));
//     }
//   }
// );

export const postSlices = createSlice({
  name: "postSlices",
  initialState: {
    userProfile: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.error("Error while fetching my info:", action.error);
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload; // Updated post object with like status//
        
        // Find the index of the updated post in the user's posts array
        const postIndex = state?.userProfile?.posts?.findIndex(
          (item) => item._id === updatedPost._id
        );
        if (postIndex !== undefined && postIndex !== -1) {
          // Replace the post with the updated post in the user's posts array
          state.userProfile.posts[postIndex] = updatedPost;
        }
      })
      .addCase(likeAndUnlikePost.rejected, (state, action) => {
        console.error("Error while liking/unliking post:", action.error);
      })
  },
});

export default postSlices.reducer;
