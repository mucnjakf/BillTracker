import { useAuth } from '../../components/auth/BtAuthProvider.jsx'

const Logout = () => {
  const { setAccessToken } = useAuth()
  setAccessToken(null)
  location.href = '/login'
}

export default Logout
