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
            label: `${item.bill?.customer?.name} ${item.bill?.customer?.surname}`,
            href: `/customers/${customerId}`,
            isActive: true,
          },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          { label: `${item.bill?.billNumber}`, href: `/customers/${customerId}/bills/${billId}`, isActive: true },
          { label: 'Items' },
          { label: `${item.product?.name}` },
        ]}
      />

      <BtPageTitle text="Bill item details"/>

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
              { size: 'col-4', label: 'Product', value: item.product?.name },
              { size: 'col-4', label: 'Category', value: item.product?.categoryName },
              { size: 'col-4', label: 'Sub-category', value: item.product?.subCategoryName },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'Price', value: item.product?.price },
              { size: 'col-4', label: 'Quantity', value: item.quantity },
              { size: 'col-4', label: 'Total price', value: item.totalPrice },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-4', label: 'Bill', value: item.bill?.billNumber },
              {
                size: 'col-4',
                label: 'Customer',
                value: `${item.bill?.customer?.name} ${item.bill?.customer?.surname}`,
              },
              {
                size: 'col-4',
                label: 'Seller',
                value: `${item.bill?.seller?.name} ${item.bill?.seller?.surname}`,
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