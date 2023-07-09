import { useParams} from 'react-router-dom'

function UserDetails() {
    const {id} = useParams()
  return (
    <div>UserDetails {id}</div>
  )
}

export default UserDetails