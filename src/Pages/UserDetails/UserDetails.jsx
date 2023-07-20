import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core'
import userimage from '../../images/user_image.jpg'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    height: '150px',
    width: '150px',
    borderRadius: '100%',
    border: '1px solid #5851B5',
    padding : '2px'

  },
  userhandle : {
    marginTop : '-10px',
  }
}));

function GridIntegration(props) {
  const classes = useStyles();

 
  let user = JSON.parse(localStorage.getItem('profile')).result
  user = { ...user, username: 'vivek_rawani'}
  const {userPosts, isLoading} = useSelector(state=>state.posts)
  if(isLoading)
  return (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="3em" />
    </Paper>
  );

  return (

    <Grid container spacing={2}>
      <Grid item md={2} sm={2} >
        <Hidden xsDown>
          <Paper className={classes.paper}>left</Paper>
        </Hidden>
      </Grid>

      <Grid item sm={8} xs={11} md={8} >
        <Paper className={classes.paper}>
          <div className="profile-page">
            <div className="profile-header">
            {user?.profilePicture ?  <img src={user.profilePicture} alt={user.name} className={classes.image} /> : <img src={userimage} alt={user.name} className={classes.image} /> }
             
              <Typography color='secondary' variant='h4'>{user.name}</Typography>
              <Typography component='div' className={classes.userhandle} gutterBottom>{user?.username && <span>@</span>}
                <span>{user.username}</span></Typography>
                <Grid container spacing={3}>
                <Grid item>

                </Grid>

                </Grid>
             
              {/* <div className="stats">
          <div className="followers">
            <span>{followers}</span>
            <span>Followers</span>
          </div>
          <div className="following">
            <span>{following}</span>
            <span>Following</span>
          </div>
        </div> */}
            </div>
            
            <div className="tweets">
              {}
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item md={2} sm={2} >
        <Hidden xsDown>
          <Paper className={classes.paper}>right</Paper>
        </Hidden>
      </Grid>

    </Grid>
  );
}

GridIntegration.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(GridIntegration);
