import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import BtFloatingTextArea from '../../components/form/BtFloatingTextArea.jsx'
import BtFloatingDateTimePicker from '../../components/form/BtFloatingDateTimePicker.jsx'
import SellerService from '../../services/SellerService.js'
import BtFloatingSelect from '../../components/form/BtFloatingSelect.jsx'
import CustomerService from '../../services/CustomerService.js'

const CustomerBillCreate = () => {
  const navigate = useNavigate()

  const { customerId } = useParams()

  const [customer, setCustomer] = useState({})
  const [sellers, setSellers] = useState([])

  const [date, setDate] = useState('')
  const [billNumber, setBillNumber] = useState('')
  const [sellerId, setSellerId] = useState(null)
  const [comment, setComment] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const getCustomer = async () => {
      const { data, error } = await CustomerService.getCustomer(customerId)

      if (error) {
        setError(error)
        return
      }

      setCustomer(data)
    }

    getCustomer()
  }, [customerId])

  useEffect(() => {
    const getSellers = async () => {
      const { data, error } = await SellerService.getSellersAll()

      if (error) {
        setError(error)
        return
      }

      data.unshift({ id: 0, name: '-' })
      setSellers(data)
    }

    getSellers()
  }, [])

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
      data: billId,
      error,
    } = await BillService.createBill(customerId, date, billNumber, comment, sellerId === 0 ? null : sellerId)

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
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Customers', href: '/customers', isActive: true },
          { label: `${customer.name} ${customer.surname}`, href: `/customers/${customerId}`, isActive: true },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Create bill"/>

      <Form noValidate validated={validated} onSubmit={handleCreate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingDateTimePicker
              controlId="txtDate"
              className="mb-3"
              required={true}
              value={date}
              onChange={setDate}/>

            <BtFloatingTextInput
              controlId="txtBillNumber"
              label="Bill number"
              className="mb-3"
              type="text"
              placeholder="Bill number"
              value={billNumber}
              onChange={setBillNumber}
              required={true}
            />

            <BtFloatingSelect
              controlId="selectSellers"
              label="Seller"
              value={sellerId}
              onChange={setSellerId}
              items={sellers}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextArea
              controlId="txtComment"
              label="Comment"
              placeholder="Comment"
              value={comment}
              onChange={setComment}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtCustomer"
              label="Customer"
              type="text"
              placeholder="Customer"
              value={`${customer.name} ${customer.surname}`}
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
              onClick={() => navigate(`/customers/${customerId}/bills`)}
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

export default CustomerBillCreate