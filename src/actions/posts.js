import { CREATE, DELETE, FETCH_ALL, LIKE_POST, UPDATE } from '../actionConstants'
import * as api from '../api'

//Action creators : are fn that return actions

export const getPosts = () => async(dispatch) => {
    
    try {
        const { data } = await api.fetchPosts()
        console.log(data)
        const action = {type : FETCH_ALL, payload : data }
        
        dispatch(action)
    } catch (error) {
        console.log(error.message)
    }
}

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




