import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtSearch from '../../components/BtSearch.jsx'
import BtSort from '../../components/BtSort.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtTable from '../../components/BtTable.jsx'
import BtPagination from '../../components/BtPagination.jsx'
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
    { value: 'quantity-asc', label: 'Quantity ASC' },
    { value: 'quantity-desc', label: 'Quantity DESC' },
    { value: 'totalPrice-asc', label: 'Total price ASC' },
    { value: 'totalPrice-desc', label: 'Total price DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'productName', label: 'Product' },
    { key: 'productPrice', label: 'Product price' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'totalPrice', label: 'Total price' },
    { key: 'billNumber', label: 'Bill number' },
    { key: 'customerName', label: 'Customer' },
    { key: 'createdUtc', label: 'Created' },
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
          { label: 'Home', href: '/', isActive: true },
          { label: 'Items' }]}
      />

      <BtPageTitle text="Items"/>

      <div className="d-flex mb-3">
        <BtSearch
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search by product or bill number"
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
            actions={[]}
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