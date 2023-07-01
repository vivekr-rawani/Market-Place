import React from 'react'
import { useDispatch } from 'react-redux'

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useStyles from './styles'
import moment from 'moment'
import { deletePost, likePost } from '../../../actions/posts'
import { } from '../../../api'
import { useNavigate } from 'react-router-dom'


function Post({ post, setCurrentId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deletePost(post._id))
    navigate('/')
  }
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId || user?.result?._id === post?.creator) &&
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size='small'
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>}
      <div className={classes.details}>
        <Typography variant='body1' color='textSecondary'>{post.tags.map((tag) => (`#${tag.trim()} `))}</Typography>
      </div>
      <div><Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography></div>
      <CardContent>
        <Typography className={classes.title} variant='body1' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='primary' onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpIcon fontSize='small' />
          {post.likes.length > 1 ? `Likes ${post.likes.length}` : `Like ${post.likes.length}`}
        </Button>
        {(user?.result?.googleId || user?.result?._id === post?.creator) && <Button size="small" color='primary' onClick={handleDelete}>
          <DeleteIcon />
          Delete
        </Button>}

      </CardActions>
    </Card>
  )
}

export default Post