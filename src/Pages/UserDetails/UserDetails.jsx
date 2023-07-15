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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    height: '300px',
    width: '300px',
    borderRadius: '100%',
    border: '2px solid #5851B5',
    padding : '2px'

  },
  userhandle : {
    marginTop : '-10px',
  }
}));

function GridIntegration(props) {
  const classes = useStyles();


  const bio = 'these met connected hang leg exist place seen story final current everything sort student slip directly window party part eat post cake scientist atomic'
  const tweets = ['pictured ourselves cutting highway owner motor stick without appearance potatoes recent sides nature sweet guard realize health shore limited apple she hello hungry sound',
    'NhucLYaCwGUjb'
  ]
  let user = JSON.parse(localStorage.getItem('profile')).result
  user = { ...user, username: 'vivek_rawani', bio }
  const {userPosts, isLoading} = useSelector(state=>state.posts)
  console.log(userPosts);

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
              <img src={user.profilePicture} alt={user.name} className={classes.image} />
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
              {tweets.map((tweet, index) => (
                <div key={index} className="tweet">
                  <p>{tweet}</p>
                </div>
              ))}
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
