import { useAuth } from '../../components/BtAuthProvider'
import { useNavigate } from 'react-router'

const Logout = () => {
  const { setAccessToken } = useAuth()
  const navigate = useNavigate()

  setAccessToken(null)
  navigate('/login')

  return
}

export default Logout
