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
import SubCategoryService from '../../services/SubCategoryService.js'

const SubCategories = () => {
  const [pagedSubCategories, setPagedSubCategories] = useState({ items: [] })
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
    { value: 'productsCount-asc', label: 'Products ASC' },
    { value: 'productsCount-desc', label: 'Products DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'productsCount', label: 'Products' },
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
      onClick: (subCategory) => location.href = `/categories/${subCategory.categoryId}/subcategories/${subCategory.id}`,
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (subCategory) => location.href = `/categories/${subCategory.categoryId}/subcategories/${subCategory.id}/update?returnUrl=/categories/${subCategory.categoryId}/subcategories/${subCategory.id}`,
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (subCategory) => location.href = `/categories/${subCategory.categoryId}/subcategories/${subCategory.id}/delete?returnUrl=/categories/${subCategory.categoryId}/subcategories/${subCategory.id}`,
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getSubCategories = async () => {
        const { data, error } = await SubCategoryService.getSubCategoryTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedSubCategories(data)
      }

      getSubCategories()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Sub-categories' }]}
      />

      <BtPageTitle text="Sub-categories"/>

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
            data={pagedSubCategories.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedSubCategories.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedSubCategories.totalPages}
          totalItems={pagedSubCategories.items.length}
          totalCount={pagedSubCategories.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default SubCategories