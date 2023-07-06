import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'
import { BiImageAdd } from 'react-icons/bi'
import { ImAttachment, ImLocation } from 'react-icons/im'
import { CiLocationOn } from 'react-icons/ci'
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';

function Form({ currentId, setCurrentId, setShow }) {
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])


    const handleInput = (e) => {

        const selectedfile = e.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                setPostData((s) => { return { ...s, selectedFile: srcData } })

            };
            fileReader.readAsDataURL(imageFile);
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (currentId) {
            dispatch(updatePost({ ...postData, name: user?.result?.name }))


        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name, userProfilePicture: user?.result?.profilePicture }))
        }
        clear()
        setShow(false)

    }
    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }




    if (!user)
        return (
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
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />

                <TextField
                    name='message'
                    label='Message'
                    variant='outlined'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}

                />

                <TextField
                    name='tags'
                    label='Tags'
                    variant='outlined'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.attachments}>
                    <label className={classes.customFileUpload}>
                        <input type="file" onInput={handleInput} className={classes.inputFile} accept='image/*' />
                        <BiImageAdd />
                    </label>
                    <ImAttachment fontSize='1.2rem' />
                    <CiLocationOn fontSize='1.2rem' />
                    <ImLocation fontSize='1.2rem' />
                </div>
                <Grid container justifyContent="center">
                    <Grid item>
                        <img src={postData.selectedFile} alt='' style={{ height: '100px' }} />
                    </Grid>
                </Grid>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )
}

export default Form
