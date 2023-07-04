import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import FileBase from 'react-file-base64'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import Icon from './icon';
import { signin, signup, googleSignIn, googleSignUp } from '../../actions/auth';
// import { AUTH } from '../../actionConstants';
import useStyles from './styles';
import Input from './Input';
import BackDrop from '../BackDrop'
import jwt_decode from 'jwt-decode'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };


  function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;
    console.log(tokenResponse)
    if (isSignup) {
      dispatch(googleSignUp(accessToken,navigate))
    } else {
      dispatch(googleSignIn(accessToken, navigate))
    }
    
  }
  const googleError = (err) => {
    console.log(err)
    console.log('Google Sign In was unsuccessful. Try again later');
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: googleError });



  // const googleSuccess = async (res) => {

  //   const data = jwt_decode(res.credential)
  //   try {
  //     dispatch(googleSignIn(data))
  //     navigate('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const { message, isLoading } = useSelector((state) => state.auth)
  
  //console.log(process.env.REACT_APP_CLIENT_ID)
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}  >
              {message && <Alert severity="error">{message}</Alert>}
            </Grid>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type="password" />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            {isSignup && <Grid container spacing={0} className={classes.fileupload}>
              <Grid item xs={12} sm={6} >
                <Typography variant='body1'>{form.profilePicture === '' ? 'Choose profile image' : 'Profile Image uploaded'}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>

                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setForm({ ...form, profilePicture: base64 })
                  }
                />
              </Grid>
            </Grid>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button fullWidth variant="contained" color="secondary" className={classes.submit} onClick={login}>
            {isSignup ? 'Sign Up ' : 'Sign In '} with Google
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <BackDrop isLoading={isLoading} />
    </Container>
  );
};

export default SignUp;