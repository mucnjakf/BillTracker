import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SalesTrendOverTimeChart from '../../components/charts/SalesTrendOverTimeChart.jsx'
import TopSellingProductsChart from '../../components/charts/TopSellingProductsChart.jsx'
import SalesByCategoryChart from '../../components/charts/SalesByCategoryChart.jsx'
import BillingActivityChart from '../../components/charts/BillingActivityChart.jsx'
import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import {
  BsCash,
  BsCashCoin,
  BsPerson,
  BsPlusCircle,
  BsShop,
} from 'react-icons/bs'
import BtListGroup from '../../components/display/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import BtDashboardCard from '../../components/display/BtDashboardCard.jsx'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import CustomerService from '../../services/CustomerService.js'
import SellerService from '../../services/SellerService.js'

const Dashboard = () => {
  const { accessToken } = useAuth()

  const [currentMonthEarnings, setCurrentMonthEarnings] = useState([])
  const [totalCustomersCount, setTotalCustomersCount] = useState([])
  const [totalBillsCount, setTotalBillsCount] = useState([])
  const [totalSellersCount, setTotalSellersCount] = useState([])

  useEffect(() => {
      const getCurrentMonthEarnings = async () => {
        const { data } = await BillService.getCurrentMonthEarnings()
        setCurrentMonthEarnings(data)
      }

      const getTotalCustomersCount = async () => {
        const { data } = await CustomerService.getTotalCustomersCount()
        setTotalCustomersCount(data)
      }

      const getTotalBillsCount = async () => {
        const { data } = await BillService.getTotalBillsCount()
        setTotalBillsCount(data)
      }

      const getTotalSellersCount = async () => {
        const { data } = await SellerService.getTotalSellersCount()
        setTotalSellersCount(data)
      }

      getCurrentMonthEarnings()
      getTotalCustomersCount()
      getTotalBillsCount()
      getTotalSellersCount()
    }, [],
  )

  return (
    <>
      {accessToken ? (
          <>
            <div className="mb-3">
              <span className="text-muted"> Welcome back,</span>
              <h1 className="fw-bold mt-1">John Doe</h1>
            </div>

            <Container fluid className="p-0">
              <Row className="mb-4">
                <Col>
                  <BtDashboardCard
                    value={CurrencyUtilities.formatCurrency(currentMonthEarnings.earnings)}
                    label="Earned this month"
                    icon={BsCash}
                  />
                </Col>

                <Col>
                  <BtDashboardCard
                    value={totalCustomersCount.totalCustomers}
                    label="Total customers"
                    icon={BsPerson}
                  />
                </Col>

                <Col>
                  <BtDashboardCard
                    value={totalBillsCount.totalBills}
                    label="Total bills"
                    icon={BsCashCoin}
                  />
                </Col>

                <Col>
                  <BtDashboardCard
                    value={totalSellersCount.totalSellers}
                    label="Total sellers"
                    icon={BsShop}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <BtCard>
                    <BtCard.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="m-0">Latest customers</h3>

                        <Button
                          className="pb-2"
                          variant="success"
                          onClick={() => location.href = `/customers/create`}
                        >
                          <BsPlusCircle/>
                        </Button>
                      </div>


                      <BtListGroup
                        items={[{ name: 'pero', surname: 'peric', id: 1 }]}
                        renderListItem={(customer) => (
                          <>
                            {customer.name} {customer.surname}
                          </>
                        )}/>
                    </BtCard.Body>
                  </BtCard>
                </Col>

                <Col>
                  <BtCard>
                    <BtCard.Body>
                      <h3 className="mb-3">Customers by city</h3>


                      <BtListGroup
                        items={[{ name: 'Zagreb', count: 123 }]}
                        renderListItem={(customer) => (
                          <>
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <div>
                                {customer.name}
                              </div>

                              <div className="fw-bold">
                                {customer.count}
                              </div>
                            </div>
                          </>
                        )}/>
                    </BtCard.Body>
                  </BtCard>
                </Col>

                <Col>
                  <BtCard>
                    <BtCard.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="m-0">Latest sellers</h3>

                        <Button
                          className="pb-2"
                          variant="success"
                          onClick={() => location.href = `/sellers/create`}
                        >
                          <BsPlusCircle/>
                        </Button>
                      </div>


                      <BtListGroup
                        items={[{ name: 'pero', surname: 'peric', id: 1 }]}
                        renderListItem={(customer) => (
                          <>
                            {customer.name} {customer.surname}
                          </>
                        )}/>
                    </BtCard.Body>
                  </BtCard>
                </Col>
              </Row>

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
            </Container>
          </>)
        : <></>}
    </>
  )
}

export default Dashboard
