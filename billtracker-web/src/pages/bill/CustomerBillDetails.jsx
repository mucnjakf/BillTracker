import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import ItemService from '../../services/ItemService.js'
import BtListGroup from '../../components/display/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

const CustomerBillDetails = () => {
  const navigate = useNavigate()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})

  const [pagedBillItems, setPagedBillItems] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [error, setError] = useState(null)

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

  useEffect(() => {
    const getBillItems = async () => {
      const { data, error } = await ItemService.getBillItemList(billId, currentPage, pageSize)

      if (error) {
        setError(error)
        return
      }

      setPagedBillItems(data)
    }

    getBillItems()
  }, [billId, currentPage, pageSize])

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
          { label: bill.billNumber },
        ]}
      />

      <BtPageTitle text={`${bill.billNumber} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: bill.id },
              { size: 'col-6', label: 'GUID', value: bill.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Date', value: bill.date },
              {
                size: 'col-6',
                label: 'Bill number',
                value: bill.billNumber,
              },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Comment', value: bill.comment },
              {
                size: 'col-6',
                label: 'Total',
                value: CurrencyUtilities.formatCurrency(bill.total),
              },
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
          items={pagedBillItems.items}
          renderListItem={(item) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div className="fw-bold">
                  {item.productName}
                </div>
                <div>
                  <span
                    className="small text-muted">{CurrencyUtilities.formatCurrency(item.productPrice)} x {item.quantity} = </span>
                  <span className="fw-bold">{CurrencyUtilities.formatCurrency(item.totalPrice)}</span>
                </div>
              </div>

              <ButtonGroup>
                <Button
                  className="pb-2"
                  variant="primary"
                  onClick={() => navigate(`items/${item.id}`)}
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

        {pagedBillItems.items.length > 0 && (
          <BtPagination
            currentPage={currentPage}
            totalPages={pagedBillItems.totalPages}
            totalItems={pagedBillItems.items.length}
            totalCount={pagedBillItems.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>)
}

export default CustomerBillDetails