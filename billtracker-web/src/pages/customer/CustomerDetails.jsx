import CustomerService from '../../services/CustomerService'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtRowCol from '../../components/BtRowCol'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCashCoin, BsCardText } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import BillService from '../../services/BillService.js'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'

const CustomerDetails = () => {
  const navigate = useNavigate()

  const { customerId } = useParams()

  const [customer, setCustomer] = useState({})
  const [customerBills, setCustomerBills] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    const getCustomer = async () => {
      const { data, error } = await CustomerService.getCustomer(customerId)

      if (error) {
        setError(error)
        return
      }

      setCustomer(data)
    }

    getCustomer()
  }, [customerId])

  useEffect(() => {
    const getCustomerBills = async () => {
      const { data, error } = await BillService.getCustomerBillsLatest(customerId)

      if (error) {
        setError(error)
        return
      }

      setCustomerBills(data)
    }

    getCustomerBills()
  }, [customerId])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          { label: `${customer.name} ${customer.surname}` },
        ]}
      />

      <BtPageTitle text="Customer details"/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-2', label: 'ID', value: customer.id },
              { size: 'col-10', label: 'GUID', value: customer.guid },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-4',
                label: 'Created',
                value: customer.createdUtc,
              },
              { size: 'col-4', label: 'Name', value: customer.name },
              { size: 'col-4', label: 'Surname', value: customer.surname },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-4', label: 'Email', value: customer.email },
              {
                size: 'col-4',
                label: 'Telephone',
                value: customer.telephone,
              },
              { size: 'col-4', label: 'City', value: customer.cityName },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Latest bills</h3>

          <BtButton
            variant="primary"
            onClick={() => navigate(`bills`)}
            icon={BsCashCoin}
            label="See all"
          />
        </div>

        <BtListGroup
          items={customerBills}
          renderListItem={(bill) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div>
                  <span className="small text-muted">{bill.date}:</span> <span
                  className="fw-bold">{bill.billNumber}</span>
                </div>
                <div>
                  <span className="small text-muted">Total:</span> <span className="fw-bold">{bill.total}</span>
                </div>
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => navigate(`bills/${bill.id}`)}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>
      </div>
    </>
  )
}

export default CustomerDetails
