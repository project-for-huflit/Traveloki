import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'chiTietPhuongTien',
  initialState: {
    selectedRow: null,
  },
  reducers: {
    setSelectedRow(state, action) {
      state.selectedRow = action.payload
    },
  },
});

export const { setSelectedRow } = vehicleSlice.actions;
export default vehicleSlice.reducer;
