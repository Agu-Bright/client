import {
  ALL_NUMBER_REQUEST,
  ALL_NUMBER_SUCCESS,
  ALL_NUMBER_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const numberDetailReducer = (state = { details: [] }, action) => {
  switch (action.type) {
    case ALL_NUMBER_REQUEST:
      return {
        loading: true,
        details: [],
      };
    case ALL_NUMBER_SUCCESS:
      return {
        loading: false,
        details: action.payload,
      };
    case ALL_NUMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
