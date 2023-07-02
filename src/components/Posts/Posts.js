import React from 'react'

import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'
import { CircularProgress, Grid } from '@material-ui/core'
import MultiActionAreaCard from './Post/Postss'

function Posts({ setCurrentId }) {
    const classes = useStyles()
    const {posts, isLoading}   = useSelector((state) => state.posts)
    console.log(posts);
 
    if(!posts.length && !isLoading) return 'No Posts'

    
    return (
        <>
        {
            isLoading ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={12} lg={12}>
                        <MultiActionAreaCard post={post} setCurrentId={setCurrentId} />
                    </Grid>))}
            </Grid>
            )
        }
        
        </>

    )
}
export default Posts