import { Grid, Paper, IconButton } from '@material-ui/core'

import { useEffect, useState, } from 'react'
import Posts from '../Posts/Posts'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Form from '../CreatePost/CreatePost'
// import { useDispatch } from 'react-redux'
// import { getPostsBySearch, } from '../../actions/posts'
import { useLocation } from 'react-router-dom'
import Paginate from '../Pagination/Pagination'

import useStyles from './styles'
import { FcPlus } from 'react-icons/fc'
import { useSelector } from 'react-redux'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState(null)
  const [show, setShow] = useState(false)


  // const user =   JSON.parse(localStorage.getItem('profile'))
  // if(!user) navigate('/auth')
  // useEffect(() => {
  //   dispatch(getPosts(1));
  // }, [currentId, dispatch])
  useEffect(() => {

  }, [])
  const query = useQuery()
  const page = query.get('page') || 1

  // const searchQuery = query.get('searchQuery')
  // const [search, setSearch] = useState('')
  // const [tags, setTags] = useState([])

  // const searchPost = () => {
  //   if (searchQuery.trim() || tags) {
  //     dispatch(getPostsBySearch({ search, tags }))
  //     navigate(`/posts/search?searchQuery=${search}&tags=${tags}`)
  //   } else {
  //     navigate('/')
  //   }
  // }

  // const handleAddTag = (tag) => setTags([...tags, tag])
  // const handleDeleteTag = (tag) => setTags(tags.filter(t => t !== tag))
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const {feedback : f } = useSelector((state) => state.posts)
  let feedback;
  if(f) feedback = f[0]
  useEffect(() => {
    if (feedback) {
      setOpen(true)
    }
  }, [f, feedback])


  return (
    <Grid container>
      <Grid item sm={3} sx={{ marginRight: 12 }}>

      </Grid>
      <Grid item sm={6} mr={12}>
        {show && <Paper elevation={6} style={{ marginBottom: 30 }}>
          <Form currentId={currentId} setCurrentId={setCurrentId} setShow={setShow} />
        </Paper>}

        <Grid container justifyContent='space-between' alignItems='stretch' spacing={2} mx='25px'>
          <Grid item>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <Paper className='pagination' elevation={6}>
          <Paginate page={page} />
        </Paper>


      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>
          <Grid >
            {/* <AppBar className={classes.appBarSearch} position='static' color='inherit'>

              <TextField
                name='search'
                variant='outlined'
                label='search product'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label='Search by tags'
                variant='outlined'
              />
              <Button className={classes.searchButton} variant='contained' color='primary' onClick={searchPost}>Search</Button>

            </AppBar> */}


          </Grid>
        </Paper>
      </Grid>
      <IconButton className={classes.createPost} onClick={() => { window.scrollTo(0, 0); setShow(true) }}>
        <FcPlus fontSize={50} />
      </IconButton>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={feedback}>
          {feedback === 'success'? 'Post created !!' : 'Something went wrong!!'}
        </Alert>
      </Snackbar>
    </Grid>

  )
}
export default Home