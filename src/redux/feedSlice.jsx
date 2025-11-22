import { createSlice } from "@reduxjs/toolkit";

const feed = createSlice({
  name: "feed",
  initialState: {
    feedData: null,
  },
  reducers: {
    getFeed: (state, action) => {
      // It's good practice to ensure the payload is an array if you expect one
      if (Array.isArray(action.payload)) {
        state.feedData = action.payload;
      } else {
        console.error("getFeed payload is not an array:", action.payload);
      }
    },
    deleteFeedItem: (state, action) => {
      // 💡 IMPROVEMENT: Add a check before calling filter on feedData
      if (state.feedData) {
        state.feedData = state.feedData.filter((e) => e._id !== action.payload);
      }
    },
  },
});

export const { getFeed, deleteFeedItem } = feed.actions;
export default feed.reducer;
