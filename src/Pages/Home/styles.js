import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  '@media screen and (max-width: 500px)': {
    createPost: {
      position: 'fixed',
      right : '2rem',
      bottom: '1rem',
     
    }
  },

  createPost: {
    position: 'fixed',
    right : '2rem',
    bottom: '2rem',
   
  }
}))
