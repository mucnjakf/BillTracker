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
import ProductService from '../../services/ProductService.js'

const Products = () => {
  const [pagedProducts, setPagedProducts] = useState({ items: [] })
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
    { value: 'price-asc', label: 'Price ASC' },
    { value: 'price-desc', label: 'Price DESC' },
  ]

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'productNumber', label: 'Product number' },
    { key: 'total', label: 'Price' },
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
      onClick: (product) => location.href = `/categories/${product.categoryId}/subcategories/${product.subCategoryId}/products/${product.id}`,
    },
    {
      label: 'Update',
      variant: 'secondary',
      icon: <BsPencilSquare/>,
      onClick: (product) => location.href = `/categories/${product.categoryId}/subcategories/${product.subCategoryId}/products/${product.id}/update?returnUrl=/categories/${product.categoryId}/subcategories/${product.subCategoryId}/products/${product.id}`,
    },
    {
      label: 'Delete',
      variant: 'danger',
      icon: <BsTrash/>,
      onClick: (product) => location.href = `/categories/${product.categoryId}/subcategories/${product.subCategoryId}/products/${product.id}/delete?returnUrl=/categories/${product.categoryId}/subcategories/${product.subCategoryId}/products/${product.id}`,
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      const getProducts = async () => {
        const { data, error } = await ProductService.getProductTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
        )

        if (error) {
          setError(error)
          return
        }

        setPagedProducts(data)
      }

      getProducts()
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, pageSize, searchQuery, sortBy])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Products' }]}
      />

      <BtPageTitle text="Products"/>

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
            data={pagedProducts.items}
            actions={tableActions}
          />
        </BtCard.Body>
      </BtCard>

      {pagedProducts.items.length > 0 && (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedProducts.totalPages}
          totalItems={pagedProducts.items.length}
          totalCount={pagedProducts.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default Products