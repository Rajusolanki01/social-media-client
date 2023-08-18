import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyInfo");
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/updateMyProfile", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const appConfigStore = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: {},
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myProfile = action.payload.user;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error while fetching my info:", action.error);
      })
      .addCase(updateMyProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myProfile = action.payload.user;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error while updating profile:", action.error);
      });
  },
});

export default appConfigStore.reducer;

export const { setLoading,showToast } = appConfigStore.actions;
