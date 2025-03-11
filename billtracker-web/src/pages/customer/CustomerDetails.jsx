import CustomerService from '../../services/CustomerService'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtIconButton from '../../components/BtIconButton'
import BtRowCol from '../../components/BtRowCol'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPen, BsCash } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import BillService from '../../services/BillService.js'
import BtListGroup from '../../components/BtListGroup.jsx'

const CustomerDetails = () => {
  const navigate = useNavigate()

  const { customerId } = useParams()

  const [customer, setCustomer] = useState({})
  const [customerBills, setCustomerBills] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCustomer = async () => {
      const { data, error } = await CustomerService.get(customerId)

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
      const { data, error } = await BillService.getListLatest(customerId)

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
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details' },
        ]}
      />

      <BtPageTitle text={`${customer.name} ${customer.surname} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[{ size: 'col-12', label: 'GUID', value: customer.guid }]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'ID', value: customer.id },
              {
                size: 'col-8',
                label: 'Created',
                value: customer.createdUtc,
              },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'Name', value: customer.name },
              { size: 'col-8', label: 'Surname', value: customer.surname },
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
        <BtIconButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}`)}
          icon={BsPen}
          label="Update"
          className="me-3"
        />

        <BtIconButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Latest bills</h3>

          <BtIconButton
            variant="outline-primary"
            onClick={() => navigate(`bills`)}
            icon={BsCash}
            label="See all"
          />
        </div>

        <BtListGroup
          items={customerBills}
          onClick={(billId) => navigate(`bills/${billId}`)}
          renderListItem={(bill) => (
            <>
              <div>
                <span className="small text-muted">{bill.date}:</span> <span
                className="fw-bold">{bill.billNumber}</span>
              </div>
              <div>
                <span className="small text-muted">Total:</span> <span className="fw-bold">{bill.total}</span>
              </div>
            </>
          )}/>
      </div>
    </>
  )
}

export default CustomerDetails
