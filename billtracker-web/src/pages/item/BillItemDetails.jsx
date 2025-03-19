import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtButton from '../../components/general/BtButton.jsx'
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
          { label: 'Dashboard', href: '/', isActive: true },
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
              { size: 'col-6', label: 'ID', value: item.id },
              { size: 'col-6', label: 'GUID', value: item.guid },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Product',
                value: item.productName,
              },
              { size: 'col-6', label: 'Product number', value: item.productNumber },
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
              { size: 'col-6', label: 'Product price', value: item.productPrice },
              {
                size: 'col-6',
                label: 'Product color',
                value: item.productColor,
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
              { size: 'col-12', label: 'Bill comment', value: item.billComment },
            ]}/>

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
            columns={[
              {
                size: 'col-12',
                label: 'Created',
                value: item.createdUtc,
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