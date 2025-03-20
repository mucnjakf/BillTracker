import Container from 'react-bootstrap/Container'
import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import BtDashboardCardRow from '../../components/dashboard/BtDashboardCardRow.jsx'
import BtDashboardListRow from '../../components/dashboard/BtDashboardListRow.jsx'
import BtDashboardChartRow from '../../components/dashboard/BtDashboardChartRow.jsx'

const Dashboard = () => {
  const { accessToken } = useAuth()

  return (
    <>
      {accessToken ? (
          <>
            <div className="mb-3">
              <span className="text-muted"> Welcome back,</span>
              <h1 className="fw-bold mt-1">John Doe</h1>
            </div>

            <Container fluid className="p-0">
              <BtDashboardCardRow/>
              <BtDashboardListRow/>
              <BtDashboardChartRow/>
            </Container>
          </>)
        : <></>}
    </>
  )
}

export default Dashboard
