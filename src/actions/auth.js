import { AUTH, START_LOADING, END_LOADING, SHOW_ERROR } from '../actionConstants';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: END_LOADING })
    navigate('/posts');
  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ERROR, payload: error.response.data.message })
    dispatch({ type: END_LOADING })
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.signUp(formData)
    dispatch({ type: AUTH, data })
    dispatch({ type: END_LOADING })
    navigate('/posts')

  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ERROR, payload: error.response.data.message  })
  }
  dispatch({ type: END_LOADING })
};


export const googleAuth = (formData,navigate)=> async(dispatch) =>{
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.googleAuth(formData)
    dispatch({ type: AUTH, data })
    dispatch({ type: END_LOADING })
    navigate('/posts')
  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ERROR, payload: error.response.data.message  })
  }
  dispatch({ type: END_LOADING })
}