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
    }

    getCategories()
  }, [categoryId, subCategoryId])

  const getSubCategories = async (categoryId) => {
    const { data, error } = await SubCategoryService.getAll(categoryId)

    if (error) {
      setError(error)
      return
    }

    setSubCategories(data)
  }

  const getProducts = async (subCategoryId) => {
    const { data, error } = await ProductService.getAll(subCategoryId)

    if (error) {
      setError(error)
      return
    }

    setProducts(data)
  }

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
              onChange={(id) => {
                setCategoryId(id)
                getSubCategories(id)
              }}
              items={categories}
              required={true}
              className="mb-3"
            />

            {categoryId != null ? (
              <BtFloatingSelect
                controlId="selectSubCategories"
                label="Sub-category"
                value={subCategoryId}
                onChange={(id) => {
                  setSubCategoryId(id)
                  getProducts(id)
                }}
                items={subCategories}
                required={true}
                className="mb-3"
              />
            ) : (<></>)}

            {subCategoryId != null ? (
              <BtFloatingSelect
                controlId="selectProducts"
                label="Product"
                value={productId}
                onChange={(id) => {
                  setProductId(id)
                }}
                items={products}
                required={true}
                className="mb-3"
              />
            ) : (<></>)}


            { /*TODO add min 1 */}
            {productId != null ? (
              <BtFloatingTextInput
                controlId="txtQuantity"
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={setQuantity}
                required={true}
              />
            ) : (<></>)}
          </BtCard.Body>

          <BtCard.Footer className="d-flex w-100">
            {productId != null ? (
              <BtIconButton
                type="submit"
                variant="primary"
                className="me-2 w-100"
                icon={BsCart}
                label="Confirm"
              />
            ) : (<></>)}

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