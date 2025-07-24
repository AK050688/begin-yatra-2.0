import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { isOpen: false },
  reducers: {
    setSidebarOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = sidebarSlice.actions;
export const selectSidebar = (state) => state.sidebar.isOpen;
export default sidebarSlice.reducer;
