import axios from "axios";
import {
  getOrderFailed,
  getOrderStart,
  getOrderSuccess,
  getListOrderFailed,
  getListOrderStart,
  getListOrderSucess,
} from "../../redux/orderSlice";
import { DOMAIN } from "../../utils/settings/config";

export const createOrderUser = async (dispatch, params) => {
  dispatch(getOrderStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/order`, params);
    dispatch(getOrderSuccess());
  } catch (err) {
    dispatch(getOrderFailed(err));
  }
};

export const getListOrderUser = async (dispatch, params = "") => {
  dispatch(getListOrderStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/order/${params}`);
    dispatch(getListOrderSucess(response.data));
  } catch (err) {
    dispatch(getListOrderFailed());
  }
};
