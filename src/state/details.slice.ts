import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PodcastState {
  currentPodcast: any;
}

const initialState: PodcastState = {
  currentPodcast: null,
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    saveCurrentPodcast(state, action: PayloadAction<any>) {
      state.currentPodcast = action.payload;
    },
  },
});

export const { saveCurrentPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;