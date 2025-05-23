import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import ProductService from '../../services/ProductService.js'

const SubCategoryProductUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { categoryId, subCategoryId, productId } = useParams()

  const [product, setProduct] = useState({})
  const [name, setName] = useState('')
  const [productNumber, setProductNumber] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState(1)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

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
      setName(data.name)
      setProductNumber(data.productNumber)
      setColor(data.color)
      setPrice(data.price)
    }

    getProduct()
  }, [subCategoryId, productId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await ProductService.updateProduct(productId, subCategoryId, name, productNumber, color, price)

    if (error) {
      setError(error)
      return
    }

    navigate(returnUrl)
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
              label: name,
              href: `/categories/${categoryId}/subcategories/${subCategoryId}/products/${productId}`,
              isActive: true,
            }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Update ${name}`}/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtProductNumber"
              label="Product number"
              type="text"
              placeholder="Product number"
              value={productNumber}
              onChange={setProductNumber}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtColor"
              label="Color"
              type="text"
              placeholder="Color"
              value={color}
              onChange={setColor}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtPrice"
              label="Price"
              type="number"
              placeholder="Price"
              value={price}
              onChange={setPrice}
              min={1}
              required={true}
              className="mb-3"
              step=".01"
            />

            <BtFloatingTextInput
              controlId="txtId"
              label="ID"
              type="text"
              placeholder="ID"
              value={product.id}
              disabled={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtGuid"
              label="GUID"
              type="text"
              placeholder="GUID"
              value={product.guid}
              disabled={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtCategoryName"
              label="Category"
              type="text"
              placeholder="Category"
              value={product.categoryName}
              disabled={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtSubCategory"
              label="Sub-category"
              type="text"
              placeholder="Sub-category"
              value={product.subCategoryName}
              disabled={true}
            />
          </BtCard.Body>

          <BtCard.Footer className="d-flex w-100">
            <BtButton
              type="submit"
              variant="primary"
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
          </BtCard.Footer>
        </BtCard>
      </Form>
    </>
  )
}

export default SubCategoryProductUpdate