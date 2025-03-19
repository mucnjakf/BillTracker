import { useEffect, useState } from 'react'
import { BsCardText, BsPencilSquare, BsTrash } from 'react-icons/bs'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtSearch from '../../components/datagrid/BtSearch.jsx'
import BtSort from '../../components/datagrid/BtSort.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtTable from '../../components/datagrid/BtTable.jsx'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import ItemService from '../../services/ItemService.js'

const Items = () => {
  const [pagedItems, setPagedItems] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc')

  const [error, setError] = useState(null)

  const sortOptions = [
    { value: 'created-desc', label: 'Created DESC' },
    { value: 'created-asc', label: 'Created ASC' },
    { value: 'productName-asc', label: 'Product ASC' },
    { value: 'productName-desc', label: 'Product DESC' },
    { value: 'total-asc', label: 'Total ASC' },
    { value: 'total-desc', label: 'Total DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'productName', label: 'Product' },
    { key: 'billNumber', label: 'Bill number' },
    { key: 'customerName', label: 'Customer' },
    { key: 'totalPrice', label: 'Total price' },
    { key: 'createdUtc', label: 'Created' },
  ]

  const tableActions = [
    {
      label: '',
    },
    {
      label: 'Details',
      variant: 'primary',
      icon: <BsCardText/>,
      onClick: (item) => location.href = `/customers/${item.customerId}/bills/${item.billId}/items/${item.id}`,
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (item) => location.href = `/customers/${item.customerId}/bills/${item.billId}/items/${item.id}/update?returnUrl=/customers/${item.customerId}/bills/${item.billId}/items/${item.id}`,
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (item) => location.href = `/customers/${item.customerId}/bills/${item.billId}/items/${item.id}/delete?returnUrl=/customers/${item.customerId}/bills/${item.billId}/items/${item.id}`,
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getItems = async () => {
        const { data, error } = await ItemService.getItemTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedItems(data)
      }

      getItems()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Items' }]}
      />

      <BtPageTitle text="Items"/>

      <div className="d-flex mb-3">
        <BtSearch
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search by product"
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
            data={pagedItems.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedItems.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedItems.totalPages}
          totalItems={pagedItems.items.length}
          totalCount={pagedItems.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Items