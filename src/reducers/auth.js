import {LOGOUT, AUTH, START_LOADING, END_LOADING, SHOW_ERROR, } from '../actionConstants';
const initialState = {
  authData : null,
  isLoading : false,
  message : null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null, message : null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null, message : null };
    case START_LOADING:
        return {...state, isLoading : true};
    case END_LOADING:
      return {...state, isLoading : false};
    case SHOW_ERROR:
        return {...state, message : action.payload}
    default:
      return state;
  }
};

export default authReducer;