import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },

  media: {
    display: 'flex',
    marginTop: '3rem'
  },
  mediaImage: {
    width: '70%',

  },
  inputFile: {
      display: 'none'
    
  },
  customFileUpload: {
    display: 'inline-block',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  attachments :{
    display : 'flex',

    width : '97%',
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    

  }

}));