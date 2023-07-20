import { Grid, Paper, IconButton } from '@material-ui/core'

import { useEffect, useState, } from 'react'
import Posts from '../../components/Posts/Posts'
import Form from '../../components/CreatePost/CreatePost'
import { useLocation, useNavigate } from 'react-router-dom'
import Paginate from '../../components/Pagination/Pagination'
import useStyles from './styles'
import { TfiWrite } from 'react-icons/tfi'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState(null)
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const {feedback} = useSelector(state=> state.posts)

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


  return (
    <Grid container>
      <Grid item sm={3} sx={{ marginRight: 12 }}>
      </Grid>
      <Grid item sm={6} mr={12}>
        {show && <Paper elevation={6} style={{ marginBottom: 30 }}>
          <Form currentId={currentId} setCurrentId={setCurrentId} setOpen={setOpen} />
        </Paper>}

        <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} mx='25px'>
          <Grid item style={{width : '100%'}}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <Paper className='pagination' elevation={3}>
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
      <IconButton className={classes.createPost} onClick={() => { window.scrollTo(0, 0); setShow((p)=>!p) }}>
        <TfiWrite fontSize={25} />
      </IconButton>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={feedback === 'Success' ? 'success' : 'error'}>
          {feedback === 'Success' ? 'Post Created !' : feedback}
        </Alert>
      </Snackbar>
    </Grid>

  )
}
export default Home