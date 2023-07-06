import {  Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home/Home'
import Navbar2 from './components/Navbar/Navbar2'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetail/PostDetails'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

import { GoogleOAuthProvider } from '@react-oauth/google';
import UserDetails from './components/UserDetails/UserDetails'
import { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Test from './Pages/TestPage/Test'


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
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
            <Route path="/test" element ={<Test/>}/>
            <Route path="/404" element ={<ErrorPage/>}/>
            <Route path="*" element={<Navigate to="/404"/>} />
          </Routes>
          <Footer/>
    </GoogleOAuthProvider>
  );
}

export default App