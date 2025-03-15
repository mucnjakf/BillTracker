import { useNavigate, useParams } from 'react-router'
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
import SubCategoryService from '../../services/SubCategoryService.js'

const CategorySubCategories = () => {
  const navigate = useNavigate()

  const { categoryId } = useParams()

  const [category, setCategory] = useState({})

  const [pagedSubCategories, setPagedSubCategories] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc')

  const [error, setError] = useState(null)

  useEffect(() => {
    const getCategory = async () => {
      const { data, error } = await CategoryService.getCategory(categoryId)

      if (error) {
        setError(error)
        return
      }

      setCategory(data)
    }

    getCategory()
  }, [categoryId])

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getSubCategories = async () => {
        const { data, error } = await SubCategoryService.getCategorySubCategoryTable(
          categoryId,
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
  }, [categoryId, currentPage, pageSize, searchQuery, sortBy])

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
      label: 'Create',
      variant: 'success',
      icon: <BsPlusCircle/>,
      onClick: () => navigate(`create`),
    },
    {
      label: 'Details',
      variant: 'primary',
      icon: <BsCardText/>,
      onClick: (subCategoryId) => navigate(`${subCategoryId}`),
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (subCategoryId) => navigate(`${subCategoryId}/update?returnUrl=/categories/${categoryId}/subcategories`),
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (subCategoryId) => navigate(`${subCategoryId}/delete?returnUrl=/categories/${categoryId}/subcategories`),
    },
  ]

  return (<>
    <BtBreadcrumb
      paths={[
        { label: 'Home', href: '/', isActive: true },
        { label: 'Categories', href: '/categories', isActive: true },
        { label: category.name, href: `/categories/${categoryId}`, isActive: true },
        { label: 'Sub-categories' },
      ]}
    />

    <BtPageTitle text={`${category.name} sub-categories`}/>

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
  </>)
}

export default CategorySubCategories
