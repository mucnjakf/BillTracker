import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtIconButton from '../../components/BtIconButton.jsx'
import { BsBasket, BsPen, BsTrash } from 'react-icons/bs'

const CustomerBillDetails = () => {
  const navigate = useNavigate()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})
  const [error, setError] = useState(null)

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

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details', href: `/customers/${customerId}` },
          { label: 'Bills', href: `/customers/${customerId}/bills` },
          { label: 'Details' },
        ]}
      />

      <BtPageTitle text={`${bill.customer?.name} ${bill.customer?.surname} - ${bill.billNumber} bill details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[{ size: 'col-12', label: 'GUID', value: bill.guid }]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'Date', value: bill.date },
              {
                size: 'col-4',
                label: 'Bill number',
                value: bill.billNumber,
              },
              { size: 'col-4', label: 'Total', value: bill.total },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Comment', value: bill.comment },
              {
                size: 'col-3',
                label: 'Customer',
                value: `${bill.customer?.name} ${bill.customer?.surname}`,
              },
              {
                size: 'col-3',
                label: 'Seller',
                value: bill.seller === null ? '-' : `${bill.seller?.name} ${bill.seller?.surname}`,
              },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      {/*TODO: add list of items*/}

      <div className="d-flex">
        <BtIconButton
          variant="primary"
          onClick={() => navigate(`items`)}
          icon={BsBasket}
          label="Items"
          className="me-3"
        />

        <BtIconButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}/bills/${bill.id}`)}
          icon={BsPen}
          label="Update"
          className="me-3"
        />

        <BtIconButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}/bills/${bill.id}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>
    </>)
}

export default CustomerBillDetails