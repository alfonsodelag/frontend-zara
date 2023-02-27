import { createSlice } from "@reduxjs/toolkit";

const podcastSlice =  createSlice({
    name:"currentPodcast",
    initialState: {
        currentPodcast: null
    },
    reducers:{
        saveCurrentPodcast(state, action){
            return {
                ...state,
                currentPodcast: action.payload 
            }
        }
    }
})

export const { saveCurrentPodcast} = podcastSlice.actions
export default podcastSlice.reducer