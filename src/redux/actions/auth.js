import { SET_USER } from "../../constants/actionTypes";

export const setUser = user => dispatch => {
    dispatch({
      type: SET_USER,
      payload: {isLoggedIn: user.user != null ? true : false, user: user.user},
    });
    return user.user;
  };