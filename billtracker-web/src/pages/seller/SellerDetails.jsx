import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCardText } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtListGroup from '../../components/display/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import SellerService from '../../services/SellerService.js'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import BillService from '../../services/BillService.js'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

const SellerDetails = () => {
  const navigate = useNavigate()

  const { sellerId } = useParams()

  const [seller, setSeller] = useState({})

  const [pagedSellerBills, setPagedSellerBills] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [error, setError] = useState(null)

  useEffect(() => {
    const getSeller = async () => {
      const { data, error } = await SellerService.getSeller(sellerId)

      if (error) {
        setError(error)
        return
      }

      setSeller(data)
    }

    getSeller()
  }, [sellerId])

  useEffect(() => {
    const getSellerBills = async () => {
      const { data, error } = await BillService.getSellerBillList(sellerId, currentPage, pageSize)

      if (error) {
        setError(error)
        return
      }

      setPagedSellerBills(data)
    }

    getSellerBills()
  }, [sellerId, currentPage, pageSize])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Sellers', href: '/sellers', isActive: true },
          { label: `${seller.firstName} ${seller.lastName}` },
        ]}
      />

      <BtPageTitle text={`${seller.name} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: seller.id },
              { size: 'col-6', label: 'GUID', value: seller.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Name', value: seller.firstName },
              { size: 'col-6', label: 'Surname', value: seller.lastName },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Permanent employee', value: seller.permanentEmployee },
              { size: 'col-6', label: 'Created', value: seller.createdUtc },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/sellers/${sellerId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/sellers/${sellerId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <h3 className="mb-3">Bills</h3>

        <BtListGroup
          items={pagedSellerBills.items}
          renderListItem={(bill) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div>
                  <span className="small text-muted">{bill.date}:</span> <span
                  className="fw-bold">{bill.billNumber}</span>
                </div>
                <div>
                  <span className="small text-muted">Total:</span> <span
                  className="fw-bold">{CurrencyUtilities.formatCurrency(bill.total)}</span>
                </div>
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => location.href = `/customers/${bill.customerId}/bills/${bill.id}`}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>

        {pagedSellerBills.items.length > 0 && (
          <BtPagination
            currentPage={currentPage}
            totalPages={pagedSellerBills.totalPages}
            totalItems={pagedSellerBills.items.length}
            totalCount={pagedSellerBills.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

export default SellerDetails
