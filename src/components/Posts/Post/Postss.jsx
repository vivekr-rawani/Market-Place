import { useState } from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';
import { Card, CardActions, CardActionArea, CardHeader, CardContent, CardMedia, Button, Typography, Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CommentIcon from '@material-ui/icons/AddCommentOutlined'
import useStyles from './styles'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, likePost } from '../../../actions/posts'
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({
  marginLeft: 'auto',
}));


export default function MultiActionAreaCard({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem('profile'))

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAction = (e) => {
    e.stopPropagation()
    console.log('action');
  }
  const handleLike = () => {
    dispatch(likePost(post._id))
  }

  const handleClick = () => {
    dispatch(getPost(post._id))
    navigate(`/posts/${post._id}`)
  }
  const openUserDetails = ()=>{
    //window.alert('df')
    navigate(`/user/${post.creator}`)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
      onClick={openUserDetails}
      className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" alt={post?.name} src={post?.userProfilePicture} >{post.name.charAt(0)}</Avatar>
        }
        action={(user?.result?.googleId || user?.result?._id === post?.creator) ? <IconButton onClick={handleAction}><MoreVertIcon fontSize="medium" /></IconButton> : null}
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardActionArea onClick={handleClick}>
        {post.selectedFile && <CardMedia
          component="img"
          height="auto"
          image={post.selectedFile}
          alt="image"
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={handleLike} />
          {post.likes.length > 1 ? `${post.likes.length}` : `${post.likes.length}`}
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <ExpandMore
          onClick={() => { }}
          aria-label="share">
          <ShareIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}