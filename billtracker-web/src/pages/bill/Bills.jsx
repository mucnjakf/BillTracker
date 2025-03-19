import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtSearch from '../../components/datagrid/BtSearch.jsx'
import BtSort from '../../components/datagrid/BtSort.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtTable from '../../components/datagrid/BtTable.jsx'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import CategoryService from '../../services/CategoryService.js'
import BillService from '../../services/BillService.js'

const Bills = () => {
  const navigate = useNavigate()

  const [pagedBills, setPagedBills] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc')

  const [error, setError] = useState(null)

  const sortOptions = [
    { value: 'date-desc', label: 'Date DESC' },
    { value: 'date-asc', label: 'Date ASC' },
    { value: 'itemsCount-asc', label: 'Items ASC' },
    { value: 'itemsCount-desc', label: 'Items DESC' },
    { value: 'total-asc', label: 'Total ASC' },
    { value: 'total-desc', label: 'Total DESC' },
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
      label: '',
    },
    {
      label: 'Details',
      variant: 'primary',
      icon: <BsCardText/>,
      onClick: (bill) => location.href = `/customers/${bill.customerId}/bills/${bill.id}`,
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (bill) => location.href = `/customers/${bill.customerId}/bills/${bill.id}/update?returnUrl=/customers/${bill.customerId}/bills/${bill.id}`,
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (bill) => location.href = `/customers/${bill.customerId}/bills/${bill.id}/delete?returnUrl=/customers/${bill.customerId}/bills/${bill.id}`,
    },
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
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Bills' }]}
      />

      <BtPageTitle text="Bills"/>

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
    </>
  )
}

export default Bills