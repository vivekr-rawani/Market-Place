import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Typography, Paper, Grid, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createPost,  updatePost } from '../../actions/posts'
import { BiImageAdd } from 'react-icons/bi'
import { BiMap } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import { VscSend} from 'react-icons/vsc'




function Form({ currentId, setCurrentId, setOpen, setFeedback }) {
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const user = JSON.parse(localStorage.getItem('profile'))
    const myPost = useSelector((state)=> state.posts)

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
    //const myPost = useSelector((state)=> state.posts.feedback)
    const handleSubmit = async (e) => {
        e.preventDefault()
        //let feedback;
        if (currentId) {
            dispatch(updatePost({ ...postData, name: user?.result?.name }))
            

        } else {
         dispatch(createPost({ ...postData, name: user?.result?.name, userProfilePicture: user?.result?.profilePicture }))
         console.log(myPost);
        }
        clear()
        setOpen(true);
        
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
                {/* <TextField
                    name='title'
                    label='Message'
                    variant='outlined'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                /> */}

                <TextField
                    name='message'
                    label='Message'
                    variant='outlined'
                    fullWidth
                    multiline
                    minRows={4}
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
                    <BiMap fontSize='1.4rem'/ >
                </div>
             
            {postData.selectedFile && <Grid container justifyContent="center">
            <Grid container justifyContent='center' alignItems='flex-start'>
              <img src={postData.selectedFile} alt='' style={{ height: '13rem' }} />
              <IconButton
                style={{ padding: 0, margin : 0 }}
                onClick={() => { setPostData({ ...postData, selectedFile: '' }) }}>
                <FiDelete fontSize='1.2rem' />
              </IconButton>
               </Grid>
           
          </Grid>
          }
          <IconButton 
              disabled={postData.message === ''}
               color='primary' size='large' type='submit' fullWidth><VscSend fontSize='2rem'/></IconButton>      
            </form>
        </Paper>
    )
}

export default Form
