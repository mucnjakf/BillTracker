import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'

const BillItemDelete = () => {
  const navigate = useNavigate()

  const { customerId, billId, itemId } = useParams()

  const [item, setItem] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const getItem = async () => {
      const { data, error } = await ItemService.get(billId, itemId)

      if (error) {
        setError(error)
        return
      }

      setItem(data)
    }

    getItem()
  }, [billId, itemId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await ItemService.delete(billId, itemId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/customers/${customerId}/bills/${billId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details', href: `/customers/${customerId}` },
          { label: 'Bills', href: `/customers/${customerId}/bills` },
          { label: 'Details', href: `/customers/${customerId}/bills/${billId}` },
          { label: 'Items / Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Bill item delete"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete item?</p>

          <div>
            <label className="text-muted small">Customer name</label>
            <h5>{item.bill?.customer?.name} {item.bill?.customer?.surname}</h5>

            <label className="text-muted small mt-3">Bill number</label>
            <h5>{item.bill?.billNumber}</h5>

            <label className="text-muted small mt-3">Bill date</label>
            <h5>{item.bill?.date}</h5>

            <label className="text-muted small mt-3">Product name</label>
            <h5>{item.product?.name}</h5>

            <label className="text-muted small mt-3">Product price</label>
            <h5>{item.product?.price}</h5>

            <label className="text-muted small mt-3">Quantity</label>
            <h5>{item.quantity}</h5>

            <label className="text-muted small mt-3">Total price</label>
            <h5>{item.totalPrice}</h5>
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
              onClick={() => navigate(`/customers/${customerId}/bills/${billId}`)}
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

export default BillItemDelete