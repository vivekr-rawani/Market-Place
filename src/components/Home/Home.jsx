import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'

import { getPosts } from '../../actions/posts'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user =   JSON.parse(localStorage.getItem('profile'))
    if(!user) navigate('/auth')
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch])
    return(
    
    <Grow in>
    <Container>
      <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
    }
export default Home