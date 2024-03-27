import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    isProfileChange: false,
    mainComponentLoading: true
};

const profileStateSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileChangeFlag: (state) => {
      state.isProfileChange = !state.isProfileChange;
    },
    setMainComponentFlag: (state, value) => {
      console.log('value', value)
      state.mainComponentLoading = value.payload;
    }
  },
});

// Access actions (increment, decrement) for dispatching from components
export const actions = profileStateSlice.actions;

// Configure store with the counter slice reducer
export const store = configureStore({
  reducer: {
    profile: profileStateSlice.reducer,
  },
});