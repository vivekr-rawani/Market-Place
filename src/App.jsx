import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetail/PostDetails'

import { GoogleOAuthProvider } from '@react-oauth/google';




const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Navigate to='/posts' /> } />
            <Route path="/posts" element={  <Home /> } />
            <Route path="/posts/search" element={  <Home /> } />
            <Route path="/posts/:id" element={ <PostDetails /> } />
            <Route path="/auth" element={!user ? <Auth/> : <Navigate to='/posts' />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App