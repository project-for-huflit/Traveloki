import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'chiTietPhuongTien',
  initialState: {
    selectedRow: null,
  },
  reducers: {
    setSelectedRow(state, action) {
      // const {
      //   TenPhuongTien,
      //   LoaiPT,
      //   TenSanBay,
      //   SoGheToiDa,
      //   MaSoXe
      // } = action.payload
      state.selectedRow = action.payload
    },
  },
});

export const { setSelectedRow } = vehicleSlice.actions;
export default vehicleSlice.reducer;
