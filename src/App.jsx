import {  Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home/Home'
import Navbar2 from './components/Navbar/Navbar2'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetail/PostDetails'

import { GoogleOAuthProvider } from '@react-oauth/google';
import UserDetails from './components/UserDetails/UserDetails'
import { useEffect } from 'react'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
    console.log('user');
  }, [user])
  
  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <Navbar2 />
          <Routes>
            <Route path="/" element={ user ? <Navigate to='/posts' /> : <Navigate to='/auth' /> } />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={ <Home /> } />
            <Route path="/posts/:id" element={ <PostDetails /> } />
            <Route path="/user/:id" element={ <UserDetails /> } />
            <Route path="/auth" element={ <Auth/>} />
          </Routes>
    </GoogleOAuthProvider>
  );
}

export default App