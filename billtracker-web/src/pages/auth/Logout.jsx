import { useAuth } from '../../components/BtAuthProvider'

const Logout = () => {
  const { setAccessToken } = useAuth()
  setAccessToken(null)
  location.href = '/login'
}

export default Logout
