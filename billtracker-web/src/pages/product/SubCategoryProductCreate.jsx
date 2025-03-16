import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import SubCategoryService from '../../services/SubCategoryService.js'
import ProductService from '../../services/ProductService.js'

const SubCategoryProductCreate = () => {
  const navigate = useNavigate()

  const { categoryId, subCategoryId } = useParams()

  const [subCategory, setSubCategory] = useState({})

  const [name, setName] = useState('')
  const [productNumber, setProductNumber] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState(1)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

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
  }, [categoryId, subCategoryId])

  const handleCreate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const {
      data: productId,
      error,
    } = await ProductService.createProduct(name, productNumber, color, price, subCategoryId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/categories/${categoryId}/subcategories/${subCategoryId}/products/${productId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: subCategory.categoryName, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          { label: subCategory.name, href: `/categories/${categoryId}/subcategories/${subCategoryId}`, isActive: true },
          {
            label: 'Products',
            href: `/categories/${categoryId}/subcategories/${subCategoryId}/products`,
            isActive: true,
          },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Create product"/>

      <Form noValidate validated={validated} onSubmit={handleCreate}>
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
              onClick={() => navigate(`/categories/${categoryId}/subcategories/${subCategoryId}/products`)}
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

export default SubCategoryProductCreate