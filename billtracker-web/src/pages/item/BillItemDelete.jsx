import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtRowCol from '../../components/BtRowCol.jsx'

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
          { label: `${item.bill?.customer?.name} ${item.bill?.customer?.surname}`, href: `/customers/${customerId}` },
          { label: 'Bills', href: `/customers/${customerId}/bills` },
          { label: `${item.bill?.billNumber}`, href: `/customers/${customerId}/bills/${billId}` },
          { label: 'Items / Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Bill item delete"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete item?</p>

          <hr/>

          <div>
            <BtRowCol
              columns={[
                { size: 'col-3', label: 'ID', value: item.id },
                { size: 'col-9', label: 'Bill', value: item.bill?.billNumber },
              ]}
            />

            <BtRowCol
              columns={[
                {
                  size: 'col-6',
                  label: 'Customer',
                  value: `${item.bill?.customer?.name} ${item.bill?.customer?.surname}`,
                },
                { size: 'col-6', label: 'Product', value: item.product?.name },
              ]}
            />

            <BtRowCol
              isLastRow={true}
              columns={[
                {
                  size: 'col-4',
                  label: 'Price',
                  value: item.product?.price,
                },
                {
                  size: 'col-4',
                  label: 'Quantity',
                  value: item.quantity,
                },
                {
                  size: 'col-4',
                  label: 'Total price',
                  value: item.totalPrice,
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