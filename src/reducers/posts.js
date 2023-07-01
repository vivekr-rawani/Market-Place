import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE_POST, UPDATE, START_LOADING, END_LOADING } from "../actionConstants"
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
            console.log('start');
            return {...state, isLoading : true}
        case END_LOADING:
            console.log('end');
            return {...state, isLoading : false}
        default:
            return state
    }
}
export default reducers