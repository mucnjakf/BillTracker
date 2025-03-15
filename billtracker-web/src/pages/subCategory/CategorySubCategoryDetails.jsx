import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsBox, BsCardText, BsPencilSquare, BsTrash } from 'react-icons/bs'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import SubCategoryService from '../../services/SubCategoryService.js'
import ProductService from '../../services/ProductService.js'

const CategorySubCategoryDetails = () => {
  const navigate = useNavigate()

  const { categoryId, subCategoryId } = useParams()

  const [subCategory, setSubCategory] = useState({})
  const [subCategoryProducts, setSubCategoryProducts] = useState({ items: [] })

  const [error, setError] = useState(null)

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getCategorySubCategory(categoryId, subCategoryId)

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
      const { data, error } = await ProductService.getSubCategoryProductsLatest(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setSubCategoryProducts(data)
    }

    getSubCategoryProducts()
  }, [subCategoryId])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: subCategory.categoryName, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          {
            label: subCategory.name,
          },
        ].filter(Boolean)}
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
          onClick={() => navigate(`update?returnUrl=/categories/${categoryId}/subcategories/${subCategoryId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/categories/${categoryId}/subcategories/${subCategoryId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Latest products</h3>

          <BtButton
            variant="primary"
            onClick={() => navigate(`products`)}
            icon={BsBox}
            label="See all"
          />
        </div>

        <BtListGroup
          items={subCategoryProducts}
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
                onClick={() => location.href = `products/${product.id}`}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>
      </div>
    </>
  )
}

export default CategorySubCategoryDetails