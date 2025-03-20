import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SalesTrendOverTimeChart from '../charts/SalesTrendOverTimeChart.jsx'
import TopSellingProductsChart from '../charts/TopSellingProductsChart.jsx'
import SalesByCategoryChart from '../charts/SalesByCategoryChart.jsx'
import BillingActivityChart from '../charts/BillingActivityChart.jsx'

const BtDashboardChartRow = () => {
  return (
    <>
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
    </>
  )
}

export default BtDashboardChartRow