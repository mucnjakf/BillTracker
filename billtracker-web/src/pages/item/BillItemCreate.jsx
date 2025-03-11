import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import { useNavigate, useParams } from 'react-router'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import ItemService from '../../services/ItemService.js'
import BtAlert from '../../components/BtAlert.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtIconButton from '../../components/BtIconButton.jsx'
import { BsCart, BsXCircle } from 'react-icons/bs'
import BtFloatingSelect from '../../components/BtFloatingSelect.jsx'
import CategoryService from '../../services/CategoryService.js'
import SubCategoryService from '../../services/SubCategoryService.js'
import ProductService from '../../services/ProductService.js'
import BtRowCol from '../../components/BtRowCol.jsx'

const BillItemCreate = () => {
  const navigate = useNavigate()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [products, setProducts] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [subCategoryId, setSubCategoryId] = useState(null)
  const [productId, setProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const getBill = async () => {
      const { data, error } = await BillService.get(customerId, billId)

      if (error) {
        setError(error)
        return
      }

      setBill(data)
    }

    getBill()
  }, [customerId, billId])

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await CategoryService.getAll()

      if (error) {
        setError(error)
        return
      }

      setCategories(data)

      if (data.length > 0) {
        setCategoryId(data[0].id)
      }
    }

    getCategories()
  }, [])

  useEffect(() => {
    if (!categoryId) return

    const getSubCategories = async () => {
      const { data, error } = await SubCategoryService.getAll(categoryId)

      if (error) {
        setError(error)
        return
      }

      setSubCategories(data)

      if (data.length > 0) {
        setSubCategoryId(data[0].id)
      }
    }

    getSubCategories()
  }, [categoryId])

  useEffect(() => {
    if (!subCategoryId) return

    const getProducts = async () => {
      const { data, error } = await ProductService.getAll(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setProducts(data)

      if (data.length > 0) {
        setProductId(data[0].id)
      }
    }

    getProducts()
  }, [subCategoryId])

  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find(x => x.id === productId) || null
      setSelectedProduct(product)
    }
  }, [productId, products])

  const handleCreate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await ItemService.create(billId, quantity, productId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/customers/${customerId}/bills/${billId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Details', href: `/customers/${customerId}` },
          { label: 'Bills', href: `/customers/${customerId}/bills` },
          { label: 'Details', href: `/customers/${customerId}/bills/${billId}` },
          { label: 'Items / Create' },
        ]}
      />

      <BtPageTitle text={`${bill.customer?.name} ${bill.customer?.surname} - ${bill.billNumber} bill - item create`}/>

      <Form noValidate validated={validated} onSubmit={handleCreate}>
        <BtCard width="500px">
          {error && <BtAlert variant="danger" text={error}/>}

          <BtCard.Body>

            <BtFloatingSelect
              controlId="selectCategories"
              label="Category"
              value={categoryId}
              onChange={setCategoryId}
              items={categories}
              required={true}
              className="mb-3"
            />

            {categoryId && (
              <BtFloatingSelect
                controlId="selectSubCategories"
                label="Sub-category"
                value={subCategoryId}
                onChange={setSubCategoryId}
                items={subCategories}
                required={true}
                className="mb-3"
              />
            )}

            {subCategoryId && (
              <BtFloatingSelect
                controlId="selectProducts"
                label="Product"
                value={productId}
                onChange={(id) => setProductId(Number(id))}
                items={products}
                required={true}
                className="mb-3"
              />
            )}

            {productId && (
              <BtFloatingTextInput
                controlId="txtQuantity"
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={setQuantity}
                required={true}
                min={1}
                className="mb-3"
              />
            )}

            {selectedProduct && (
              <div className="px-2">
                <BtRowCol
                  isLastRow={true}
                  columns={[
                    {
                      size: 'col-4',
                      label: 'Product number',
                      value: selectedProduct.productNumber,
                    },
                    {
                      size: 'col-4',
                      label: 'Price',
                      value: selectedProduct.price,
                    },
                    {
                      size: 'col-4',
                      label: 'Total price',
                      value: selectedProduct.price * quantity,
                    },
                  ]}
                />
              </div>
            )}
          </BtCard.Body>

          <BtCard.Footer className="d-flex w-100">
            {productId && (
              <BtIconButton
                type="submit"
                variant="primary"
                className="me-2 w-100"
                icon={BsCart}
                label="Confirm"
              />
            )}

            <BtIconButton
              variant="secondary"
              onClick={() => navigate(`/customers/${customerId}/bills/${billId}`)}
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

export default BillItemCreate