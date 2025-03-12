import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import CityService from '../../services/CityService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtSearch from '../../components/BtSearch.jsx'
import BtSort from '../../components/BtSort.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtTable from '../../components/BtTable.jsx'
import BtPagination from '../../components/BtPagination.jsx'

const Cities = () => {
  const navigate = useNavigate()

  const [pagedCities, setPagedCities] = useState({ items: [] })
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
    { value: 'customersCount-asc', label: 'Customers ASC' },
    { value: 'customersCount-desc', label: 'Customers DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'customersCount', label: 'Customers' },
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
      onClick: (cityId) => navigate(`${cityId}`),
    },
    {
      label: 'Edit',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (cityId) =>
        navigate(`${cityId}/update?returnUrl=/cities`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (cityId) =>
        navigate(`${cityId}/delete?returnUrl=/cities`),
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getCities = async () => {
        const { data, error } = await CityService.getCityTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedCities(data)
      }

      getCities()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Cities' }]}
      />

      <BtPageTitle text="Cities"/>

      <div className="d-flex mb-3">
        <BtSearch
          searchQuery={searchQuery}
          onChange={setSearchQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search by name"
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
            data={pagedCities.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedCities.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedCities.totalPages}
          totalItems={pagedCities.items.length}
          totalCount={pagedCities.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Cities