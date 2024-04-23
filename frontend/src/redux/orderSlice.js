import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    OrderUser: {
      isFetching: false,
      isSuccess: false,
      isError: false,
    },
    listOrder: {
      orders: [],
      isFetching: false,
      isError: false,
    },
  },
  reducers: {
    getOrderStart: (state) => {
      state.OrderUser.isFetching = true;
    },
    getOrderSuccess: (state) => {
      state.OrderUser.isFetching = false;
      state.OrderUser.isSuccess = true;
    },
    getOrderFailed: (state) => {
      state.OrderUser.isFetching = false;
      state.OrderUser.isError = true;
    },
    getListOrderStart: (state) => {
      state.listOrder.isFetching = true;
    },
    getListOrderSucess: (state, action) => {
      state.listOrder.isFetching = false;
      state.listOrder.orders = action.payload;
    },
    getListOrderFailed: (state) => {
      state.listOrder.isFetching = false;
      state.listOrder.isError = true;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailed,
  getListOrderStart,
  getListOrderSucess,
  getListOrderFailed,
} = OrderSlice.actions;
export default OrderSlice.reducer;
