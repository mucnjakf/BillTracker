import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtSearch from '../../components/BtSearch.jsx'
import BtSort from '../../components/BtSort.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtTable from '../../components/BtTable.jsx'
import BtPagination from '../../components/BtPagination.jsx'

const Bills = () => {
  const navigate = useNavigate()

  const [pagedBills, setPagedBills] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')

  const [error, setError] = useState(null)

  const sortOptions = [
    { value: 'date-desc', label: 'Date DESC' },
    { value: 'date-asc', label: 'Date ASC' },
    { value: 'billNumber-asc', label: 'Bill number ASC' },
    { value: 'billNumber-desc', label: 'Bill number DESC' },
    { value: 'itemsCount-asc', label: 'Items ASC' },
    { value: 'itemsCount-desc', label: 'Items DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'billNumber', label: 'Bill number' },
    { key: 'customerName', label: 'Customer' },
    { key: 'sellerName', label: 'Seller' },
    { key: 'itemsCount', label: 'Items' },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getBills = async () => {
        const { data, error } = await BillService.getBillTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedBills(data)
      }

      getBills()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Bills' }]}
      />

      <BtPageTitle text="Bills"/>

      <div className="d-flex mb-3">
        <BtSearch
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search by bill number or customer"
        />

        <BtSort
          sortBy={sortBy}
          options={sortOptions}
          onChange={setSortBy}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <BtCard>
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtTable
            columns={tableColumns}
            data={pagedBills.items}
            actions={[]}
          />
        </BtCard.Body>
      </BtCard>

      {pagedBills.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedBills.totalPages}
          totalItems={pagedBills.items.length}
          totalCount={pagedBills.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Bills