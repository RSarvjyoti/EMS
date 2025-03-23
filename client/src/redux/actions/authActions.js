import axios from "axios";
import { BaseRoute } from "../../api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BaseRoute}/auth/signin`,
      credentials
    );
    const { token, user } = response.data;

    localStorage.setItem("token", token);

    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message || "Login failed",
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BaseRoute}/auth/signup`,
      userData
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message || "Registration failed",
    });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};
