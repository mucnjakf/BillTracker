import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCardText, BsPencilSquare, BsTrash } from 'react-icons/bs'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import SubCategoryService from '../../services/SubCategoryService.js'
import ProductService from '../../services/ProductService.js'
import BtPagination from '../../components/BtPagination.jsx'

const CategorySubCategoryDetails = () => {
  const navigate = useNavigate()

  const { subCategoryId } = useParams()

  const [subCategory, setSubCategory] = useState({})
  const [pagedSubCategoryProducts, setPagedSubCategoryProducts] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [error, setError] = useState(null)

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getSubCategory(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setSubCategory(data)
    }

    getSubCategory()
  }, [subCategoryId])

  useEffect(() => {
    const getSubCategoryProducts = async () => {
      const { data, error } = await ProductService.getSubCategoryProductList(subCategoryId, currentPage, pageSize)

      if (error) {
        setError(error)
        return
      }

      setPagedSubCategoryProducts(data)
    }

    getSubCategoryProducts()
  }, [subCategoryId, currentPage, pageSize])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Sub-categories', href: '/subcategories', isActive: true },
          { label: subCategory.name },
        ]}
      />

      <BtPageTitle text="Sub-categories details"/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: subCategory.id },
              { size: 'col-6', label: 'GUID', value: subCategory.guid },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Name',
                value: subCategory.name,
              },
              { size: 'col-6', label: 'Category', value: subCategory.categoryName },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-12', label: 'Created', value: subCategory.createdUtc },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/subcategories/${subCategoryId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/subcategories/${subCategoryId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <h3 className="mb-3">Products</h3>

        <BtListGroup
          items={pagedSubCategoryProducts.items}
          renderListItem={(product) => (
            <>
              <div className="d-flex justify-content-between align-items-center w-100 me-4">
                <div className="fw-bold">{product.name}</div>

                <div><span className="small text-muted">Price:</span> <span
                  className="fw-bold">{product.price}</span></div>
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => location.href = `/products/${product.id}`}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>

        {pagedSubCategoryProducts.items.length > 0 && (
          <BtPagination
            currentPage={currentPage}
            totalPages={pagedSubCategoryProducts.totalPages}
            totalItems={pagedSubCategoryProducts.items.length}
            totalCount={pagedSubCategoryProducts.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

export default CategorySubCategoryDetails