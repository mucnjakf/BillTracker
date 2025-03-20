import Col from 'react-bootstrap/Col'
import BtCard from '../display/BtCard.jsx'
import Button from 'react-bootstrap/Button'
import { BsCardText, BsPlusCircle } from 'react-icons/bs'
import BtListGroup from '../display/BtListGroup.jsx'
import Row from 'react-bootstrap/Row'
import { useEffect, useState } from 'react'
import CustomerService from '../../services/CustomerService.js'
import SellerService from '../../services/SellerService.js'

const BtDashboardListRow = () => {
  const [latestCustomers, setLatestCustomers] = useState([])
  const [customersByCity, setCustomersByCity] = useState([])
  const [latestSellers, setLatestSellers] = useState([])

  useEffect(() => {
      const getLatestCustomers = async () => {
        const { data } = await CustomerService.getCustomersLatestList()
        setLatestCustomers(data)
      }

      const getCustomersByCity = async () => {
        const { data } = await CustomerService.getCustomersByCity()
        console.log(data)
        setCustomersByCity(data)
      }

      const getLatestSellers = async () => {
        const { data } = await SellerService.getSellersLatestList()
        setLatestSellers(data)
      }

      getLatestCustomers()
      getCustomersByCity()
      getLatestSellers()
    }, [],
  )

  return (
    <Row className="mb-4">
      <Col>
        <BtCard className="h-100">
          <BtCard.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="m-0">Latest customers</h3>

              <Button
                className="pb-2"
                variant="success"
                onClick={() => location.href = '/customers/create'}
              >
                <BsPlusCircle/>
              </Button>
            </div>


            <BtListGroup
              items={latestCustomers}
              renderListItem={(customer) => (
                <>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      {customer.name} {customer.surname}
                    </div>

                    <Button variant="primary" className="pb-2"
                            onClick={() => location.href = `/customers/${customer.id}`}>
                      <BsCardText/>
                    </Button>
                  </div>
                </>
              )}/>
          </BtCard.Body>
        </BtCard>
      </Col>

      <Col>
        <BtCard className="h-100">
          <BtCard.Body>
            <h3 className="mb-3">Customers by city</h3>

            <BtListGroup
              items={customersByCity}
              renderListItem={(item) => (
                <>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      {item.cityName}
                    </div>

                    <div>
                      {item.customerCount}
                    </div>
                  </div>
                </>
              )}/>
          </BtCard.Body>
        </BtCard>
      </Col>

      <Col>
        <BtCard className="h-100">
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
              items={latestSellers}
              renderListItem={(seller) => (
                <>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      {seller.name} {seller.surname}
                    </div>

                    <Button variant="primary" className="pb-2"
                            onClick={() => location.href = `/sellers/${seller.id}`}>
                      <BsCardText/>
                    </Button>
                  </div>
                </>
              )}/>
          </BtCard.Body>
        </BtCard>
      </Col>
    </Row>
  )
}

export default BtDashboardListRow