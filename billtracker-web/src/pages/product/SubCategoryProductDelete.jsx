import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import ProductService from '../../services/ProductService.js'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

const SubCategoryProductDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { categoryId, subCategoryId, productId } = useParams()

  const [product, setProduct] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/categories/${categoryId}/subcategories/${subCategoryId}/products`

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

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await ProductService.deleteProduct(subCategoryId, productId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/categories/${categoryId}/subcategories/${subCategoryId}/products`)
  }

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
          returnUrl.startsWith(`/categories/${categoryId}/subcategories/${subCategoryId}/products/`)
            ? {
              label: product.name,
              href: `/categories/${categoryId}/subcategories/${subCategoryId}/products/${productId}`,
              isActive: true,
            }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${product.name}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete product?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: product.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: product.id },
              { size: 'col-6', label: 'Product number', value: product.productNumber },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-12',
                label: 'Name',
                value: product.name,
              },
            ]}
          />

          <BtRowCol
            columns={[
              {
                size: 'col-6',
                label: 'Color',
                value: product.color,
              },
              { size: 'col-6', label: 'Price', value: CurrencyUtilities.formatCurrency(product.price) },
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

        <BtCard.Footer>
          <div className="d-flex w-100">
            <BtButton
              variant="danger"
              onClick={handleDelete}
              className="me-2 w-100"
              icon={BsCheckCircle}
              label="Confirm"
            />

            <BtButton
              variant="secondary"
              onClick={() => navigate(returnUrl)}
              className="w-100"
              icon={BsXCircle}
              label="Cancel"
            />
          </div>
        </BtCard.Footer>
      </BtCard>
    </>
  )
}

export default SubCategoryProductDelete