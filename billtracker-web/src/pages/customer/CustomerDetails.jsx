import CustomerService from '../../services/CustomerService'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCashCoin, BsCardText } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import BillService from '../../services/BillService.js'
import BtListGroup from '../../components/display/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

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
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          { label: `${customer.name} ${customer.surname}` },
        ]}
      />

      <BtPageTitle text={`${customer.name} ${customer.surname} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: customer.id },
              { size: 'col-6', label: 'GUID', value: customer.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Name', value: customer.name },
              { size: 'col-6', label: 'Surname', value: customer.surname },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Email', value: customer.email },
              {
                size: 'col-6',
                label: 'Telephone',
                value: customer.telephone,
              },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'City', value: customer.cityName },
              {
                size: 'col-6',
                label: 'Created',
                value: customer.createdUtc,
              },
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
                  <span className="small text-muted">Total:</span> <span
                  className="fw-bold">{CurrencyUtilities.formatCurrency(bill.total)}</span>
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
