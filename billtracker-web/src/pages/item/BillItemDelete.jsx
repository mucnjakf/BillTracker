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

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/customers/${customerId}/bills/${billId}`

  useEffect(() => {
    const getItem = async () => {
      const { data, error } = await ItemService.getBillItem(billId, itemId)

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

    const { error } = await ItemService.deleteItem(billId, itemId)

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
          { label: 'Home', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          {
            label: item.customerName,
            href: `/customers/${customerId}`,
            isActive: true,
          },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          { label: item.billNumber, href: `/customers/${customerId}/bills/${billId}`, isActive: true },
          { label: 'Items' },
          returnUrl.startsWith(`/customers/${customerId}/bills/${billId}/items/`)
            ?
            {
              label: item.productName,
              href: `/customers/${customerId}/bills/${billId}/items/${itemId}`,
              isActive: true,
            }
            : (''),
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${item.quantity} ${item.productName}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete item?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: item.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: item.id },
              {
                size: 'col-6',
                label: 'Created',
                value: item.createdUtc,
              },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-12',
                label: 'Product',
                value: item.productName,
              },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Product number', value: item.productNumber },
              { size: 'col-6', label: 'Product price', value: item.productPrice },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Category', value: item.productCategory },
              {
                size: 'col-6',
                label: 'Sub-category',
                value: item.productSubCategory,
              },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Quantity', value: item.quantity },
              { size: 'col-6', label: 'Total price', value: item.totalPrice },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Bill date', value: item.billDate },
              { size: 'col-6', label: 'Bill number', value: item.billNumber },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Customer',
                value: item.customerName,
              },
              { size: 'col-6', label: 'Seller', value: item.sellerName },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[]}
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
    </>
  )
}

export default BillItemDelete