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

const CustomerBillUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { customerId, billId } = useParams()

  const [customerName, setCustomerName] = useState('')
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

      setCustomerName(`${data.customer.name} ${data.customer.surname}`)
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
          { label: `${customerName}`, href: `/customers/${customerId}`, isActive: true },
          { label: 'Bills', href: `/customers/${customerId}/bills`, isActive: true },
          returnUrl.startsWith(`/customers/${customerId}/bills/`)
            ? { label: `${billNumber}`, href: `/customers/${customerId}/bills/${billId}`, isActive: true }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Customer bill update"/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          {error && <BtAlert variant="danger" text={error}/>}

          <BtCard.Body>
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