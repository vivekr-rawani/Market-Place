import React from 'react'
import { Paper } from '@material-ui/core'
import Paginate from '../Pagination/Pagination'
import { useLocation} from 'react-router'

function useQuery(){
    return new URLSearchParams(useLocation().search)
  }
function Footer() {
    const query = useQuery()
    const page = query.get('page') || 1
   
  return (
    
     <div>j</div>
    
  )
}

export default Footer