import Container from 'react-bootstrap/Container'
import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import BtDashboardCardRow from '../../components/dashboard/BtDashboardCardRow.jsx'
import BtDashboardListRow from '../../components/dashboard/BtDashboardListRow.jsx'
import BtDashboardChartRow from '../../components/dashboard/BtDashboardChartRow.jsx'

const Dashboard = () => {
  const { accessToken, user } = useAuth()

  return (
    <>
      {accessToken ? (
          <>
            <div className="mb-3">
              <span className="text-muted">Welcome back,</span>
              <h1 className="fw-bold mt-1">{user.name}</h1>
            </div>

            <Container fluid className="p-0">
              <BtDashboardCardRow/>
              <BtDashboardListRow/>
              <BtDashboardChartRow/>
            </Container>
          </>)
        : <>
          <h1 className="mb-3 fw-bold">Welcome to BillTracker</h1>

          <p className="mb-3 w-50">
            Bill Tracker is your all-in-one solution for managing business operations efficiently. <br/>
            Easily handle <strong>customers, bills, items, products, categories, subcategories, sellers, and
            cities</strong>, all in one place.
          </p>

          <p className="w-50">
            To unlock the full functionality, please <a href="/login"
                                                        className="text-dark text-decoration-none"><strong>log
            in</strong></a> or <a href="/register" className="text-dark text-decoration-none"><strong>register</strong></a>. <br/>
            Not ready yet? You can still <a href="/customers" className="text-dark text-decoration-none"><strong>view
            customer data</strong></a> without an
            account.
          </p>
        </>}
    </>
  )
}

export default Dashboard
