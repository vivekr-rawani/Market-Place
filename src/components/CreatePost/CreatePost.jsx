import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts.js'
import { BiImageAdd} from 'react-icons/bi'
import {ImAttachment, ImLocation}  from 'react-icons/im'
import {CiLocationOn} from 'react-icons/ci'


function Form({ currentId, setCurrentId, setShow }) {
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', image: '' })
    const user = JSON.parse(localStorage.getItem('profile'))


    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleInput = (e) => {
        console.log(e.target.files);
        const selectedfile = e.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                setPostData((s) => { return { ...s, image: srcData } })

            };
            fileReader.readAsDataURL(imageFile);
        }
    }

    const handleSubmit = async(e) => {
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
        setPostData({ title: '', message: '', tags: '', image: '' })
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
                        <input type="file" onInput={handleInput} className={classes.inputFile}/>
                        <BiImageAdd />
                    </label>
                    <ImAttachment fontSize='1.2rem'/>
                    <CiLocationOn fontSize='1.2rem'/>
                    <ImLocation fontSize='1.2rem'/>
                </div>
                <div className={classes.media}>
                <img src={postData.image} alt='' className={classes.mediaImage}/>
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form