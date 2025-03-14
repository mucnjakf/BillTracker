import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { BsCardText, BsPencilSquare, BsPlusCircle, BsTrash } from 'react-icons/bs'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtSearch from '../../components/BtSearch.jsx'
import BtSort from '../../components/BtSort.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtTable from '../../components/BtTable.jsx'
import BtPagination from '../../components/BtPagination.jsx'
import CategoryService from '../../services/CategoryService.js'

const Categories = () => {
  const navigate = useNavigate()

  const [pagedCategories, setPagedCategories] = useState({ items: [] })
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
    { value: 'subCategoriesCount-asc', label: 'Sub-categories ASC' },
    { value: 'subCategoriesCount-desc', label: 'Sub-categories DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'subCategoriesCount', label: 'Sub-categories' },
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
      onClick: (categoryId) => navigate(`${categoryId}`),
    },
    {
      label: 'Edit',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (categoryId) =>
        navigate(`${categoryId}/update?returnUrl=/categories`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (categoryId) =>
        navigate(`${categoryId}/delete?returnUrl=/cities`),
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getCategories = async () => {
        const { data, error } = await CategoryService.getCategoryTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedCategories(data)
      }

      getCategories()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories' }]}
      />

      <BtPageTitle text="Categories"/>

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
            data={pagedCategories.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedCategories.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedCategories.totalPages}
          totalItems={pagedCategories.items.length}
          totalCount={pagedCategories.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Categories