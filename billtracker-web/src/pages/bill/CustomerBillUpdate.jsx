import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtFloatingDateTimePicker from '../../components/BtFloatingDateTimePicker.jsx'
import BtFloatingTextArea from '../../components/BtFloatingTextArea.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import DateTimeUtilities from '../../utilities/DateTimeUtilities.js'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'

const CustomerBillUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { customerId, billId } = useParams()

  const [bill, setBill] = useState({})
  const [billNumber, setBillNumber] = useState('')
  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/customers/${customerId}/bills`

  useEffect(() => {
    const getBill = async () => {
      const { data, error } = await BillService.getCustomerBill(customerId, billId)

      if (error) {
        setError(error)
        return
      }

      setBill(data)
      setBillNumber(data.billNumber)
      setDate(DateTimeUtilities.formatDateForInput(data.date))
      setComment(data.comment)
    }

    getBill()
  }, [customerId, billId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await BillService.updateBill(
      customerId,
      billId,
      date,
      comment,
    )

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
          { label: `${bill.customerName}`, href: `/customers/${customerId}`, isActive: true },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          returnUrl.startsWith(`/customers/${customerId}/bills/`)
            ? { label: `${billNumber}`, href: `/customers/${customerId}/bills/${billId}`, isActive: true }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Update ${billNumber}`}/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingDateTimePicker
              controlId="txtDate"
              className="mb-3"
              required={true}
              value={date}
              onChange={setDate}/>

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
              controlId="txtId"
              label="ID"
              className="mb-3"
              type="text"
              placeholder="ID"
              value={bill.id}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtGuid"
              label="GUID"
              className="mb-3"
              type="text"
              placeholder="GUID"
              value={bill.guid}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtBillNumber"
              label="Bill number"
              className="mb-3"
              type="text"
              placeholder="Bill number"
              value={bill.billNumber}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtTotal"
              label="Total"
              className="mb-3"
              type="number"
              placeholder="Total"
              value={bill.total}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtCustomerName"
              label="Customer"
              className="mb-3"
              type="text"
              placeholder="Customer"
              value={bill.customerName}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtSellerName"
              label="Seller"
              type="text"
              placeholder="Seller"
              value={bill.sellerName}
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
    </>)
}

export default CustomerBillUpdate