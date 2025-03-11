import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtRowCol from '../../components/BtRowCol.jsx'

const CustomerBillDelete = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})
  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/customers/${customerId}/bills`

  useEffect(() => {
    const getBill = async () => {
      const { data, error } = await BillService.get(customerId, billId)

      if (error) {
        setError(error)
        return
      }

      setBill(data)
    }
    getBill()
  }, [customerId, billId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await BillService.delete(customerId, billId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/customers/${customerId}/bills`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details', href: `/customers/${customerId}` },
          { label: 'Bills', href: `/customers/${customerId}/bills` },
          returnUrl.startsWith(`/customers/${customerId}/bills/`)
            ? { label: 'Details', href: `/customers/${customerId}/bills/${billId}` }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Customer bill delete"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete bill?</p>

          <hr/>

          <div>
            <BtRowCol
              columns={[
                { size: 'col-3', label: 'ID', value: bill.id },
                { size: 'col-9', label: 'Date', value: bill.date },
              ]}
            />

            <BtRowCol
              columns={[
                {
                  size: 'col-6',
                  label: 'Bill number',
                  value: bill.billNumber,
                },
                { size: 'col-6', label: 'Total', value: bill.total },
              ]}
            />

            <BtRowCol
              isLastRow={true}
              columns={[
                {
                  size: 'col-6',
                  label: 'Customer',
                  value: `${bill.customer?.name} ${bill.customer?.surname}`,
                },
                {
                  size: 'col-6',
                  label: 'Seller',
                  value: bill.seller === null ? '-' : `${bill.seller?.name} ${bill.seller?.surname}`,
                },
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
    </>)
}

export default CustomerBillDelete