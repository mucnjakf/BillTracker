import CustomerService from '../../services/CustomerService'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtIconButton from '../../components/BtIconButton'
import BtRowCol from '../../components/BtRowCol'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPen } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

const CustomerDetails = () => {
  const navigate = useNavigate()

  const { customerId } = useParams()

  const [customer, setCustomer] = useState({})
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

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details' },
        ]}
      />

      <BtPageTitle text="Customer details"/>

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
                value: new Date(customer.createdUtc).toLocaleString(),
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

      <div className="d-flex">
        <BtIconButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}`)}
          icon={BsPen}
          label="Update customer"
          className="me-3"
        />

        <BtIconButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}`)}
          icon={BsTrash}
          label="Delete customer"
        />
      </div>
    </>
  )
}

export default CustomerDetails
