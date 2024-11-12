import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
  name: 'chiTietTuyenDuong',
  initialState: {
    selectedRow: null,
  },
  reducers: {
    setSelectedRow(state, action) {
      state.selectedRow = action.payload
    },
  },
});

export const { setSelectedRow } = routeSlice.actions;
export default routeSlice.reducer;
