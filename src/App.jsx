import {  Routes, Route, Navigate } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Navbar2 from './components/Navbar/Navbar2'
import Auth from './components/Auth/Auth'
import PostDetails from './Pages/PostDetail/PostDetails'
import ErrorPage from './Pages/ErrorPage/ErrorPage'


import { GoogleOAuthProvider } from '@react-oauth/google';
import UserDetails from './Pages/UserDetails/UserDetails'
import { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Test from './Pages/TestPage/Test'
import { useSelector } from 'react-redux'


const App = () => {
  const {user} = useSelector(state=> state.auth)
  const profile = user?.result
  
  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <Navbar2 />
          <Routes>
            <Route path="/" element={ user ? <Navigate to='/posts' /> : <Navigate to='/auth' /> } />
            <Route path="/posts" element={ user ? <Home /> :  <Navigate to='/auth' />} />
            <Route path="/posts/search" element={ user ? <Home /> :  <Navigate to='/auth' /> } />
            <Route path="/post/:id" element={ user ? <PostDetails /> :  <Navigate to='/auth' />} />
            <Route path="/user/:id" element={ user ? <UserDetails />  :  <Navigate to='/auth' />} />
            <Route path="/auth" element={ user  ? <Navigate to='/' /> : <Auth/>} />
            <Route path="/test" element ={<Test/>}/>
            <Route path="/404" element ={<ErrorPage/>}/>
            <Route path="*" element={<Navigate to="/404"/>} />
          </Routes>
          <Footer/>
    </GoogleOAuthProvider>
  );
}

export default App