import Form from 'react-bootstrap/Form'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import SellerService from '../../services/SellerService.js'
import BtCheckbox from '../../components/form/BtCheckbox.jsx'
import DateTimeUtilities from '../../utilities/DateTimeUtilities.js'

const SellerUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { sellerId } = useParams()

  const [seller, setSeller] = useState({})
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [permanentEmployee, setPermanentEmployee] = useState(false)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/sellers'

  useEffect(() => {
    const getSeller = async () => {
      const { data, error } = await SellerService.getSeller(sellerId)

      if (error) {
        setError(error)
        return
      }

      setSeller(data)
      setName(data.firstName)
      setSurname(data.lastName)
      setPermanentEmployee(data.permanentEmployee === 'Yes')
    }

    getSeller()
  }, [sellerId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await SellerService.updateSeller(sellerId, name, surname, permanentEmployee)

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
          { label: 'Sellers', href: '/sellers', isActive: true },
          returnUrl.startsWith('/sellers/')
            ? { label: `${name} ${surname}`, href: `/sellers/${sellerId}`, isActive: true }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Update ${name} ${surname}`}/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              className="mb-3"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
              required={true}
            />

            <BtFloatingTextInput
              controlId="txtSurname"
              label="Surname"
              className="mb-3"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={setSurname}
              required={true}
            />

            <BtFloatingTextInput
              controlId="txtId"
              label="ID"
              className="mb-3"
              type="text"
              placeholder="ID"
              value={seller.id}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtGuid"
              label="GUID"
              className="mb-3"
              type="text"
              placeholder="GUID"
              value={seller.guid}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtCreatedUtc"
              label="Created"
              className="mb-3"
              type="datetime-local"
              placeholder="Created"
              value={DateTimeUtilities.formatDateForInput(seller.createdUtc || '')}
              disabled={true}
            />

            <BtCheckbox
              id="chbPermanentEmployee"
              label="Permanent Employee"
              isChecked={permanentEmployee}
              onChange={setPermanentEmployee}
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

export default SellerUpdate
