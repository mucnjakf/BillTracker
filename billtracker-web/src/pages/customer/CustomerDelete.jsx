import CustomerService from '../../services/CustomerService'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

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
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          returnUrl.startsWith('/customers/')
            ? { label: 'Details', href: `/customers/${customerId}` }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`${customer.name} ${customer.surname} delete`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete customer?</p>

          <div>
            <label className="text-muted small">Name</label>
            <h5>{customer.name}</h5>

            <label className="mt-3 text-muted small">Surname</label>
            <h5>{customer.surname}</h5>

            <label className="mt-3 text-muted small">Email</label>
            <h5>{customer.email}</h5>
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
