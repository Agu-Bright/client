import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

//login user
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/api/login", formData);
    localStorage.setItem("token", JSON.stringify({ token: data.token }));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    const { data } = await axios.get("/api/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
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
