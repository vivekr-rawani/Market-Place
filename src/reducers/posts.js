import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE_POST, UPDATE, START_LOADING, END_LOADING, FETCH_POST } from "../actionConstants"
const intialState = {
    posts:[],
    currentPage: 0,
    numberOfPages:0,
    isLoading:true
}
const reducers = ( state=intialState, action) =>{
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts : action.payload.posts,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload}
        case CREATE:
            return {...state, posts : [...state.posts, action.payload]}
        case UPDATE:
            return {...state, posts : state.posts.map( post => post._id === action.payload._id ? action.payload : post)}
        case DELETE:
            return {...state, posts : state.posts.filter( post => post._id !== action.payload)}
        case LIKE_POST:
            return {...state, posts:state.posts.map( post => post._id === action.payload._id ? action.payload : post)}
        case START_LOADING:
            return {...state, isLoading : true}
        case END_LOADING:
            return {...state, isLoading : false}
        case FETCH_POST:
            return {...state, post : action.payload }
        default:
            return state
    }
}
export default reducers