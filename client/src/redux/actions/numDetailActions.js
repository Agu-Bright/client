import {
  ALL_NUMBER_REQUEST,
  ALL_NUMBER_SUCCESS,
  ALL_NUMBER_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

import axios from "axios";

//get all number details

export const getDetails = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NUMBER_REQUEST });
    const data = await axios.get("/api/getdetails");
    dispatch({ type: ALL_NUMBER_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({
      type: ALL_NUMBER_FAIL,
      payload: error.message,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
