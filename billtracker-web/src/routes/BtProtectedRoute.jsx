import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../components/BtAuthProvider'

const ProtectedRoute = () => {
  const { accessToken } = useAuth()

  if (!accessToken) {
    return <Navigate to="/login"/>
  }

  return <Outlet/>
}

export default ProtectedRoute
