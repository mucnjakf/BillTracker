import { useAuth } from '../../components/BtAuthProvider'
import { useNavigate } from 'react-router'

const Logout = () => {
  const navigate = useNavigate()

  const { setAccessToken } = useAuth()

  setAccessToken(null)
  navigate('/login')
}

export default Logout
