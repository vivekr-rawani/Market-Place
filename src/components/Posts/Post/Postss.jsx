import { useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';
import { Card, CardActions, CardActionArea, CardHeader, CardContent, CardMedia, Box, Typography, Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { BiSolidShareAlt } from 'react-icons/bi'
import CommentIcon from '@material-ui/icons/AddCommentOutlined'
import useStyles from './styles'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, likePost } from '../../../actions/posts.js'
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import { AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike, AiOutlineHeart } from 'react-icons/ai'
import { FcLike, } from 'react-icons/fc'
import { GoHeart } from 'react-icons/go'
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAction = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget);
  }
  const handleClose = (e) => {

    setAnchorEl(null);
    if (e.target.textContent === 'Delete') {
      dispatch(deletePost(post._id))
      navigate('/')
    }
  };


  const handleClick = () => {
    dispatch(getPost(post._id))
    navigate(`/post/${post._id}`)
  }
  const openUserDetails = () => {
    navigate(`/user/${post.creator}`)
  }
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result._id
  const hasLiked = likes.find((like) => like === userId);
  
  const handleLike = async () => {
    dispatch(likePost(post._id))
    if (hasLiked) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
      setDislike(false)
    }

  }
  const Likes = () => {
    if (likes.length > 0) {

      return hasLiked ? <AiFillLike fontSize='1.6rem' /> : <AiOutlineLike fontSize='1.6rem' />
    }

    return <AiOutlineLike fontSize='1.6rem' />
  }
  let likeMessage;
  if(likes.length===0) likeMessage='be the first to like'
  else if(hasLiked && likes.length === 1) likeMessage = `You Liked`
  else if(hasLiked) likeMessage = `You and ${likes.length - 1} other likes`
  else likeMessage = `${likes.length} likes`

  const [dislike, setDislike] = useState(false)
  const handleDisLike = () => {
    if(hasLiked) setLikes(post.likes.filter((id) => id !== userId))
    setDislike(p => !p)
    

  }




  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        onClick={openUserDetails}
        className={classes.cardHeader}
        avatar={
          <Avatar alt={post?.name} src={post?.userProfilePicture} >{post.name.charAt(0)}</Avatar>
        }
        action={(user?.result?.googleId || user?.result?._id === post?.creator) ? <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleAction}>
          <MoreVertIcon fontSize="medium" />
        </IconButton> : null}
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} >Edit</MenuItem>
        <MenuItem onClick={handleClose} >Delete</MenuItem>
      </Menu>
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
          <Typography variant="body2" color="secondary">
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
       
       <Box>
       <IconButton aria-label="add to favorites" onClick={handleLike}>
          <Likes />  </IconButton> 
       </Box>
          <IconButton onClick={handleDisLike}>
          {dislike ? <AiFillDislike fontSize='1.6rem' /> : <AiOutlineDislike fontSize='1.6rem' />}
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
       
       
        <ExpandMore
          onClick={() => { }}
          aria-label="share">
          <BiSolidShareAlt />
        </ExpandMore>
      </CardActions>
      <Typography variant='subtitle2'  style={{margin : '-12px 0 12px 12px', color : '#757575'}} > {likeMessage} </Typography> 
    </Card>
  );
}