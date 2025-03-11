import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import ItemService from '../../services/ItemService.js'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const CustomerBillDetails = () => {
  const navigate = useNavigate()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})
  const [billItems, setBillItems] = useState([])
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

  useEffect(() => {
    const getBillItems = async () => {
      const { data, error } = await ItemService.getList(billId)

      if (error) {
        setError(error)
        return
      }

      setBillItems(data)
    }

    getBillItems()
  }, [billId])

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
            columns={[
              { size: 'col-2', label: 'ID', value: bill.id },
              { size: 'col-10', label: 'GUID', value: bill.guid },
            ]}
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

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/customers/${customerId}/bills/${bill.id}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/customers/${customerId}/bills/${bill.id}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Items</h3>

          <Button
            style={{ width: '125px' }}
            className="pb-2 me-3"
            variant="success"
            onClick={() => navigate(`items/create`)}
          >
            <BsPlusCircle/>
          </Button>

        </div>

        <BtListGroup
          items={billItems}
          onClick={(itemId) => navigate(`bills/${billId}/items/${itemId}`)}
          renderListItem={(item) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div className="fw-bold">
                  {item.productName}
                </div>
                <div>
                  <span className="small text-muted">{item.productPrice} x {item.quantity} = </span>
                  <span className="fw-bold">{item.totalPrice}</span>
                </div>
              </div>

              <ButtonGroup>
                <Button
                  className="pb-2"
                  variant="primary"
                  onClick={() => navigate(`items/${bill.id}`)}
                >
                  <BsCardText/>
                </Button>

                <Button
                  className="pb-2"
                  variant="secondary"
                  onClick={() => navigate(`items/${item.id}/update`)}
                >
                  <BsPencilSquare/>
                </Button>

                <Button
                  className="pb-2"
                  variant="danger"
                  onClick={() => navigate(`items/${item.id}/delete`)}
                >
                  <BsTrash/>
                </Button>
              </ButtonGroup>
            </>
          )}/>
      </div>
    </>)
}

export default CustomerBillDetails