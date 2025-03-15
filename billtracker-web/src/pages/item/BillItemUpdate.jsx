import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import Form from 'react-bootstrap/Form'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'

const BillItemUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { customerId, billId, itemId } = useParams()

  const [item, setItem] = useState({})

  const [quantity, setQuantity] = useState(0)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/customers/${customerId}/bills/${billId}`

  useEffect(() => {
    const getItem = async () => {
      const { data, error } = await ItemService.getBillItem(billId, itemId)

      if (error) {
        setError(error)
        return
      }

      setItem(data)
      setQuantity(data.quantity)
    }

    getItem()
  }, [billId, itemId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await ItemService.updateItem(billId, itemId, quantity)

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
          { label: 'Home', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          {
            label: item.customerName,
            href: `/customers/${customerId}`,
            isActive: true,
          },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          { label: item.billNumber, href: `/customers/${customerId}/bills/${billId}`, isActive: true },
          { label: 'Items' },
          returnUrl.startsWith(`/customers/${customerId}/bills/${billId}/items/`)
            ?
            {
              label: item.productName,
              href: `/customers/${customerId}/bills/${billId}/items/${itemId}`,
              isActive: true,
            }
            : (''),
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Bill item update"/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

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

            <div className="px-2">
              <BtRowCol
                columns={[
                  {
                    size: 'col-7',
                    label: 'Product',
                    value: item.productName,
                  },
                  {
                    size: 'col-5',
                    label: 'Product number',
                    value: item.productNumber,
                  },
                ]}
              />

              <BtRowCol
                isLastRow={true}
                columns={[
                  {
                    size: 'col-6',
                    label: 'Price',
                    value: item.productPrice,
                  },
                  {
                    size: 'col-6',
                    label: 'Total price',
                    value: item.productPrice * quantity,
                  },
                ]}
              />
            </div>
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

export default BillItemUpdate