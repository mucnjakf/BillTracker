import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtSearch from '../../components/BtSearch.jsx'
import BtSort from '../../components/BtSort.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtTable from '../../components/BtTable.jsx'
import BtPagination from '../../components/BtPagination.jsx'

const CustomerBills = () => {
  const navigate = useNavigate()

  const { customerId } = useParams()

  const [pagedBills, setPagedBills] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc')
  const [error, setError] = useState(null)

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getBills = async () => {
        const { data, error } = await BillService.getTable(
          customerId,
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
  }, [customerId, currentPage, pageSize, searchQuery, sortBy])

  const sortOptions = [
    { value: 'date-desc', label: 'Date DESC' },
    { value: 'date-asc', label: 'Date ASC' },
    { value: 'number-asc', label: 'Number ASC' },
    { value: 'number-desc', label: 'Number DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'billNumber', label: 'Bill number' },
    { key: 'itemCount', label: 'Items' },
    { key: 'total', label: 'Total' },
  ]

  const tableActions = [
    {
      label: 'Create',
      variant: 'success',
      icon: <BsPlusCircle/>,
      onClick: () => navigate(`create`),
    },
    {
      label: 'Details',
      variant: 'primary',
      icon: <BsCardText/>,
      onClick: (billId) => navigate(`${billId}`),
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (billId) => navigate(`${billId}/update?returnUrl=/customers/${customerId}/bills`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (billId) => navigate(`${billId}/delete?returnUrl=/customers/${customerId}/bills`),
    },
  ]

  return (<>
    <BtBreadcrumb
      paths={[
        { label: 'Home', href: '/' },
        { label: 'Customers', href: '/customers' },
        { label: 'Details', href: `/customers/${customerId}` },
        { label: 'Bills' },
      ]}
    />

    <BtPageTitle text="Customer bills"/>

    <div className="d-flex mb-3">
      <BtSearch
        searchQuery={searchQuery}
        onChange={setSearchQuery}
        setCurrentPage={setCurrentPage}
        placeholder="Search by bill number"
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
          actions={tableActions}
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
  </>)
}

export default CustomerBills
