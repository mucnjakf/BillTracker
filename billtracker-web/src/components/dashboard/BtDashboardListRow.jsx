import Col from 'react-bootstrap/Col'
import BtCard from '../display/BtCard.jsx'
import Button from 'react-bootstrap/Button'
import { BsPlusCircle } from 'react-icons/bs'
import BtListGroup from '../display/BtListGroup.jsx'
import Row from 'react-bootstrap/Row'

const BtDashboardListRow = () => {
  return (
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
  )
}

export default BtDashboardListRow