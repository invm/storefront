import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        error: action.payload,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true
      };
    default:
      return state;
  }
};
