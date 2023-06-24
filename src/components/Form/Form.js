import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'

function Form({ currentId, setCurrentId }) {
    const post = useSelector((state)=> currentId ? state.posts.find(p => p._id===currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const[ postData, setPostData] = useState({ title:'', message:'', tags:'', selectedFile : ''})
    const user = JSON.parse(localStorage.getItem('profile'))
    useEffect(()=>{
        if(post) setPostData(post)
    }, [post])


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(currentId)
        if(currentId) {
            dispatch(updatePost({...postData, name : user?.result?.name}))
        } else {
        dispatch(createPost({...postData, name : user?.result?.name}))
        }
        clear()
    }
    const clear = ()=>{
        setCurrentId(null)
        setPostData({ title:'', message:'', tags:'', selectedFile : ''})
    }
    if(!user)
        return(
            <Paper>
                Please Login
            </Paper>
        )
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Create a post</Typography>
                    <TextField
                    name='title'
                    label='Title'
                    variant='outlined'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                    />

                    <TextField
                    name='message'
                    label='Message'
                    variant='outlined'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}

                    />
                    
                    <TextField
                    name='tags'
                    label='Tags'
                    variant='outlined'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                    />
                    <div>
                        <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>setPostData({ ...postData, selectedFile: base64 })
        }
                />
                    </div>
                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                    <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form