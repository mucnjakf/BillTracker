import CustomerService from '../../services/CustomerService'
import BtSearch from '../../components/BtSearch'
import BtSort from '../../components/BtSort'
import BtPagination from '../../components/BtPagination'
import BtTable from '../../components/BtTable'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtPageTitle from '../../components/BtPageTitle'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

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
      onClick: (customerId) => navigate(`${customerId}`),
    },
    {
      label: 'Edit',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (customerId) =>
        navigate(`${customerId}/update?returnUrl=/customers`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (customerId) =>
        navigate(`${customerId}/delete?returnUrl=/customers`),
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
          { label: 'Home', href: '/', isActive: true },
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
