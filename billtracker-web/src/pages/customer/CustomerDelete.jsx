import CustomerService from '../../services/CustomerService'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'

const CustomerDelete = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { customerId } = useParams()

  const [customer, setCustomer] = useState({})
  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/customers'

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

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await CustomerService.delete(customerId)

    if (error) {
      setError(error)
      return
    }

    navigate('/customers')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          returnUrl.startsWith('/customers/')
            ? { label: `${customer.name} ${customer.surname}`, href: `/customers/${customerId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Customer delete"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete customer?</p>

          <hr/>

          <div>
            <BtRowCol
              columns={[
                { size: 'col-6', label: 'ID', value: customer.id },
                { size: 'col-6', label: 'Email', value: customer.email },
              ]}
            />

            <BtRowCol
              isLastRow={true}
              columns={[
                { size: 'col-6', label: 'Name', value: customer.name },
                { size: 'col-6', label: 'Surname', value: customer.surname },
              ]}
            />
          </div>
        </BtCard.Body>

        <BtCard.Footer>
          <div className="d-flex w-100">
            <BtButton
              variant="danger"
              onClick={handleDelete}
              className="me-2 w-100"
              icon={BsCheckCircle}
              label="Confirm"
            />

            <BtButton
              variant="secondary"
              onClick={() => navigate(returnUrl)}
              className="w-100"
              icon={BsXCircle}
              label="Cancel"
            />
          </div>
        </BtCard.Footer>
      </BtCard>
    </>
  )
}

export default CustomerDelete
