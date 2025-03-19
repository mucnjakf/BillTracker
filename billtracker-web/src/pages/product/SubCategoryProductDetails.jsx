import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import ProductService from '../../services/ProductService.js'

const SubCategoryProductDetails = () => {
  const navigate = useNavigate()

  const { categoryId, subCategoryId, productId } = useParams()

  const [product, setProduct] = useState({})

  const [error, setError] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await ProductService.getSubCategoryProduct(subCategoryId, productId)

      if (error) {
        setError(error)
        return
      }

      setProduct(data)
    }

    getProduct()
  }, [subCategoryId, productId])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: product.categoryName, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          {
            label: product.subCategoryName,
            href: `/categories/${categoryId}/subcategories/${subCategoryId}`,
            isActive: true,
          },
          {
            label: 'Products',
            href: `/categories/${categoryId}/subcategories/${subCategoryId}/products`,
            isActive: true,
          },
          {
            label: product.name,
          },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`${product.name} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: product.id },
              { size: 'col-6', label: 'GUID', value: product.guid },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Name',
                value: product.name,
              },
              { size: 'col-6', label: 'Product number', value: product.productNumber },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Color',
                value: product.color,
              },
              { size: 'col-6', label: 'Price', value: product.price },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Category', value: product.categoryName },
              { size: 'col-6', label: 'Sub-category', value: product.subCategoryName },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Created', value: product.createdUtc },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/categories/${categoryId}/subcategories/${subCategoryId}/products/${productId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/categories/${categoryId}/subcategories/${subCategoryId}/products/${productId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>
    </>
  )
}

export default SubCategoryProductDetails