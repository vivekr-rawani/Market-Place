import { CREATE, DELETE, FETCH_ALL, LIKE_POST, UPDATE, START_LOADING, FETCH_POST, FETCH_BY_SEARCH, END_LOADING } from '../actionConstants'
import * as api from '../api'

//Action creators : are fn that return actions


export const getPosts = (page) => async(dispatch) => {
    
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page)
       console.log(data);
        dispatch({type : FETCH_ALL, payload : data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPost(id);
      dispatch({ type: FETCH_POST, payload: { post: data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data : {data} } = await api.fetchPostsBySearch(searchQuery);
      //console.log(data);
  
      dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
     dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
export const createPost = (post)=> async(dispatch)=>{
    try {
        const { data } = await api.createPost(post)
        dispatch( { type : CREATE, payload:data})
    } catch (err) {
        console.log(err);
        
    }
}

export const updatePost = (id, post)=> async(dispatch)=>{
    try {
        const { data } = await api.updatePost(id, post)
        dispatch( { type : UPDATE, payload:data})
    } catch (err) {
        console.log(err)  
    }
}

export const deletePost = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch( { type : DELETE , payload:id})
    } catch (err) {
        console.log(err)  
    }
}

export const likePost = (id)=> async(dispatch)=>{
    try {
        const { data } = await api.likePost(id)
        dispatch( { type : LIKE_POST, payload:data})
    } catch (err) {
        console.log(err)  
    }
}




