import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../components/auth/BtAuthProvider.jsx'

const ProtectedRoute = () => {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to="/login"/>
  }

  return <Outlet/>
}

export default ProtectedRoute
