import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { useState, useEffect } from 'react'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPostsBySearch, getPosts } from '../../actions/posts'
import { useNavigate, useLocation} from 'react-router-dom'
import Paginate from '../Pagination/Pagination'
import useStyles from './styles'
function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user =   JSON.parse(localStorage.getItem('profile'))
    // if(!user) navigate('/auth')
    // useEffect(() => {
    //   dispatch(getPosts(1));
    // }, [currentId, dispatch])
    
    const query = useQuery()
    const page = query.get('page') || 1

    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    
    const searchPost = () => {
     if(search.trim() || tags){
      dispatch(getPostsBySearch({search, tags}))
      navigate(`/posts/search?searchQuery=${search}&tags=${tags}`)
     }else{
      navigate('/')
     }
    }

  const handleAddTag = (tag) => setTags([...tags, tag])
  const handleDeleteTag = (tag) => setTags(tags.filter(t => t !== tag))
    
    return(
    
    <Grow in>
    <Container maxwidth="xl">
      <Grid container justifyContent='space-between' alignItems='stretch' spacing={2}>
        <Grid item xs={12} sm={6} md={9}> 
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position='static' color='inherit'>
        
          <TextField 
          name='search'
          variant='outlined'
          label='search product'
          fullWidth
          value={search}
          onChange={ (e)=> setSearch(e.target.value)}
          />
          <ChipInput 
            style={{margin:'10px 0'}}
            value={tags}
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
            label='Search by tags'
            variant='outlined'
          />
          <Button className={classes.searchButton} variant='contained' color='primary' onClick={searchPost}>Search</Button>
          
          </AppBar>
          
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          
          <Paper className={classes.pagination} elevation={6}>

          <Paginate page={page}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
    }
export default Home