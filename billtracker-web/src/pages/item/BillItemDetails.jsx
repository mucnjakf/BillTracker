import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

const BillItemDetails = () => {
  const navigate = useNavigate()

  const { customerId, billId, itemId } = useParams()

  const [item, setItem] = useState({})

  const [error, setError] = useState(null)

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
          { label: item.productName },
        ]}
      />

      <BtPageTitle text={`${item.quantity} ${item.productName} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-2', label: 'ID', value: item.id },
              { size: 'col-6', label: 'GUID', value: item.guid },
              { size: 'col-4', label: 'Created', value: item.createdUtc },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'Product', value: item.productName },
              { size: 'col-4', label: 'Category', value: item.productCategory },
              { size: 'col-4', label: 'Sub-category', value: item.productSubCategory },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'Price', value: item.productPrice },
              { size: 'col-4', label: 'Quantity', value: item.quantity },
              { size: 'col-4', label: 'Total price', value: item.totalPrice },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-4', label: 'Bill', value: item.billNumber },
              {
                size: 'col-4',
                label: 'Customer',
                value: item.customerName,
              },
              {
                size: 'col-4',
                label: 'Seller',
                value: item.sellerName,
              },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}/bills/${billId}/items/${itemId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}/bills/${billId}/items/${itemId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>
    </>
  )
}

export default BillItemDetails