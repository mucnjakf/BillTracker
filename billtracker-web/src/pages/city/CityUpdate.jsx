import Form from 'react-bootstrap/Form'
import CityService from '../../services/CityService'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/general/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import DateTimeUtilities from '../../utilities/DateTimeUtilities.js'

const CityUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { cityId } = useParams()

  const [city, setCity] = useState({})
  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/cities'

  useEffect(() => {
    const getCity = async () => {
      const { data, error } = await CityService.getCity(cityId)

      if (error) {
        setError(error)
        return
      }

      setCity(data)
      setName(data.name)
    }

    getCity()
  }, [cityId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await CityService.updateCity(cityId, name)

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
          { label: 'Cities', href: '/cities', isActive: true },
          returnUrl.startsWith('/cities/')
            ? { label: name, href: `/cities/${cityId}`, isActive: true }
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
              className="mb-3"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
              required={true}
            />

            <BtFloatingTextInput
              controlId="txtId"
              label="ID"
              className="mb-3"
              type="text"
              placeholder="ID"
              value={city.id}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtGuid"
              label="GUID"
              className="mb-3"
              type="GUID"
              placeholder="GUID"
              value={city.guid}
              disabled={true}
            />

            <BtFloatingTextInput
              controlId="txtCreatedUtc"
              label="Created"
              type="datetime-local"
              placeholder="Created"
              value={DateTimeUtilities.formatDateForInput(city.createdUtc || '')}
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

export default CityUpdate
