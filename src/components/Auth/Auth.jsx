import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BiImageAdd } from 'react-icons/bi'
import { ImAttachment, ImLocation } from 'react-icons/im'
import { CiLocationOn } from 'react-icons/ci'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import Icon from './icon';
import { signin, signup, googleAuth } from '../../actions/auth';

import useStyles from './styles';
import Input from './Input';
import BackDrop from '../BackDrop'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', filename: '' };

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


  const handleGoogleLoginSuccess = (tokenResponse) => {
    const accessToken = tokenResponse.access_token
    dispatch(googleAuth(accessToken, navigate))

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
  const handleInput = (e) => {
    const selectedfile = e.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        let filename = imageFile.name;
        if (filename.length > 15) filename = filename.slice(0, 15) + '...'
        setForm((s) => { return { ...s, profilePicture: srcData, filename: filename } })

      };
      fileReader.readAsDataURL(imageFile);
    }
  }


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
            <Input name="password" label="Password" handleChange={handleChange} type="password" autocomplete="current-password" />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            {isSignup && <Grid container spacing={0} className={classes.fileupload}>
              <Grid item xs={6}>
                <Typography variant='subtitle2'>{form.filename === '' ? 'Choose profile image' : form.filename}</Typography>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.attachments}>
                  <label className={classes.customFileUpload}>
                    <input type="file" onInput={handleInput} className={classes.inputFile} accept='image/*' />
                    <BiImageAdd />
                  </label>
                </div>
              </Grid>
            </Grid>}
          </Grid>

          {form.profilePicture && <Grid container justifyContent="center">
            <Grid item>
              <img src={form.profilePicture} alt='' style={{height:'100px'}}/>
            </Grid>
          </Grid>
          }
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button fullWidth variant="contained" color="secondary" className={classes.submit} onClick={login}>
            Continue with Google
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