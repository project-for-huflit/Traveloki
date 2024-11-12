import { createSlice } from '@reduxjs/toolkit';

const waypointSlice = createSlice({
  name: 'chiTietTramDung',
  initialState: {
    selectedRow: null,
  },
  reducers: {
    setSelectedRow(state, action) {
      state.selectedRow = action.payload
    },
  },
});

export const { setSelectedRow } = waypointSlice.actions;
export default waypointSlice.reducer;
