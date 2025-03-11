import Form from 'react-bootstrap/Form'
import CityService from '../../services/CityService'
import CustomerService from '../../services/CustomerService'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtPageTitle from '../../components/BtPageTitle'
import BtFloatingSelect from '../../components/BtFloatingSelect'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

const CustomerUpdate = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { customerId } = useParams()

  const [cities, setCities] = useState([])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [cityId, setCityId] = useState('')
  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/customers'

  useEffect(() => {
    const getCustomer = async () => {
      const { data, error } = await CustomerService.get(customerId)

      if (error) {
        setError(error)
        return
      }

      setName(data.name)
      setSurname(data.surname)
      setEmail(data.email)
      setTelephone(data.telephone)
      setCityId(data.cityId === 0 ? null : data.cityId)
    }

    getCustomer()
  }, [customerId])

  useEffect(() => {
    const getCities = async () => {
      const { data, error } = await CityService.getAll()

      if (error) {
        setError(error)
        return
      }

      data.unshift({ id: 0, name: '-' })
      setCities(data)
    }

    getCities()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await CustomerService.update(
      customerId,
      name,
      surname,
      email,
      telephone,
      cityId === 0 ? null : cityId,
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
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          returnUrl.startsWith('/customers/')
            ? { label: 'Details', href: `/customers/${customerId}` }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`${name} ${surname} update`}/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          {error && <BtAlert variant="danger" text={error}/>}

          <BtCard.Body>
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
              controlId="txtEmail"
              label="Email"
              className="mb-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              required={true}
            />

            <BtFloatingTextInput
              controlId="txtTelephone"
              label="Telephone"
              className="mb-3"
              type="text"
              placeholder="Telephone"
              value={telephone}
              onChange={setTelephone}
              required={true}
            />

            <BtFloatingSelect
              controlId="selectCities"
              label="City"
              value={cityId}
              onChange={setCityId}
              placeholder="Select city"
              items={cities}
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
    </>
  )
}

export default CustomerUpdate
