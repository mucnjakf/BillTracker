import CustomerService from '../../services/CustomerService'
import BtSearch from '../../components/datagrid/BtSearch.jsx'
import BtSort from '../../components/datagrid/BtSort.jsx'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import BtTable from '../../components/datagrid/BtTable.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'

const Customers = () => {
  const navigate = useNavigate()

  const [pagedCustomers, setPagedCustomers] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc')

  const [error, setError] = useState(null)

  const sortOptions = [
    { value: 'created-desc', label: 'Created DESC' },
    { value: 'created-asc', label: 'Created ASC' },
    { value: 'name-asc', label: 'Name ASC' },
    { value: 'name-desc', label: 'Name DESC' },
    { value: 'surname-asc', label: 'Surname ASC' },
    { value: 'surname-desc', label: 'Surname DESC' },
    { value: 'billsCount-asc', label: 'Bills ASC' },
    { value: 'billsCount-desc', label: 'Bills DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'surname', label: 'Surname' },
    { key: 'telephone', label: 'Telephone' },
    { key: 'cityName', label: 'City' },
    { key: 'billsCount', label: 'Bills' },
    { key: 'createdUtc', label: 'Created' },
  ]

  const tableActions = [
    {
      label: 'Create',
      variant: 'success',
      icon: <BsPlusCircle/>,
      onClick: () => navigate(`create`),
    },
    {
      label: 'View',
      variant: 'primary',
      icon: <BsCardText/>,
      onClick: (customer) => navigate(`${customer.id}`),
    },
    {
      label: 'Edit',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (customer) =>
        navigate(`${customer.id}/update?returnUrl=/customers`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (customer) =>
        navigate(`${customer.id}/delete?returnUrl=/customers`),
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getCustomers = async () => {
        const { data, error } = await CustomerService.getCustomerTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedCustomers(data)
      }

      getCustomers()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Customers' }]}
      />

      <BtPageTitle text="Customers"/>

      <div className="d-flex mb-3">
        <BtSearch
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search by name or surname"
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
            data={pagedCustomers.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedCustomers.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedCustomers.totalPages}
          totalItems={pagedCustomers.items.length}
          totalCount={pagedCustomers.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Customers
