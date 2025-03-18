import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/general/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtRowCol from '../../components/display/BtRowCol.jsx'

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
      const { data, error } = await BillService.getCustomerBill(customerId, billId)

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

    const { error } = await BillService.deleteBill(customerId, billId)

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
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          {
            label: bill.customerName,
            href: `/customers/${customerId}`,
            isActive: true,
          },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          returnUrl.startsWith(`/customers/${customerId}/bills/`)
            ? { label: `${bill.billNumber}`, href: `/customers/${customerId}/bills/${billId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${bill.billNumber}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete bill?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: bill.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: bill.id },
              { size: 'col-6', label: 'Date', value: bill.date },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Bill number',
                value: bill.billNumber,
              },
              {
                size: 'col-6',
                label: 'Total',
                value: bill.total,
              },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'Comment', value: bill.comment },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Customer', value: bill.customerName },
              {
                size: 'col-6',
                label: 'Seller',
                value: bill.sellerName,
              },
            ]}
          />
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