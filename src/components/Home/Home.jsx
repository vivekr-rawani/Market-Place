import { Grid, Paper, IconButton } from '@material-ui/core'

import { useEffect, useState, } from 'react'
import Posts from '../Posts/Posts'
import Form from '../CreatePost/CreatePost'
// import { useDispatch } from 'react-redux'
// import { getPostsBySearch, } from '../../actions/posts'
import { useLocation } from 'react-router-dom'
import Paginate from '../Pagination/Pagination'

import useStyles from './styles'
import { FcPlus } from 'react-icons/fc'

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

  return (
    <Grid container>
      <Grid item sm={3} sx={{ marginRight: 12 }}>

      </Grid>
      <Grid item sm={6} mr={12}>
        {show && <Paper elevation={6} style={{ marginBottom: 30 }}>
          <Form currentId={currentId} setCurrentId={setCurrentId} setShow={setShow}/>
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
      <IconButton className={classes.createPost} onClick={() => {window.scrollTo(0, 0); setShow(true) }}>
        <FcPlus fontSize={50} />
      </IconButton>
    </Grid>

  )
}
export default Home