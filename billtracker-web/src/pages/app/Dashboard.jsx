import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SalesTrendOverTimeChart from '../../components/charts/SalesTrendOverTimeChart.jsx'
import TopSellingProductsChart from '../../components/charts/TopSellingProductsChart.jsx'
import SalesByCategoryChart from '../../components/charts/SalesByCategoryChart.jsx'
import BillingActivityChart from '../../components/charts/BillingActivityChart.jsx'
import CustomersByCityChart from '../../components/charts/CustomersByCityChart.jsx'
import RevenueBySellerChart from '../../components/charts/RevenueBySellerChart.jsx'
import { useAuth } from '../../components/BtAuthProvider.jsx'

const Dashboard = () => {
  const { accessToken } = useAuth()

  return (
    <>
      <h1 className="mb-3">Dashboard</h1>

      {accessToken ? (
          <Container fluid className="p-0">
            <Row className="mb-4">
              <Col className="col-6">
                <SalesTrendOverTimeChart/>
              </Col>

              <Col className="col-6">
                <TopSellingProductsChart/>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="col-6">
                <SalesByCategoryChart/>
              </Col>

              <Col className="col-6">
                <BillingActivityChart/>
              </Col>
            </Row>

            <Row>
              <Col className="col-6">
                <CustomersByCityChart/>
              </Col>

              <Col className="col-6">
                <RevenueBySellerChart/>
              </Col>
            </Row>
          </Container>)
        : <></>}
    </>
  )
}

export default Dashboard
