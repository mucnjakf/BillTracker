import Form from 'react-bootstrap/Form'
import CityService from '../../services/CityService'
import CustomerService from '../../services/CustomerService'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtCard from '../../components/BtCard'
import BtIconButton from '../../components/BtIconButton'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtPageTitle from '../../components/BtPageTitle'
import BtFloatingSelect from '../../components/BtFloatingSelect'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BsPersonAdd, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

// TODO: validation
const CustomerCreate = () => {
  const navigate = useNavigate()

  const [cities, setCities] = useState([])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [cityId, setCityId] = useState(null)
  const [error, setError] = useState(null)

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

  const handleCreate = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await CustomerService.create(name, surname, email, telephone, cityId === 0 ? null : cityId)

    if (error) {
      setError(error)
      return
    }

    navigate('/customers')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Customers', href: '/customers' },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Customer create"/>

      <Form>
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
            />

            <BtFloatingTextInput
              controlId="txtSurname"
              label="Surname"
              className="mb-3"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={setSurname}
            />

            <BtFloatingTextInput
              controlId="txtEmail"
              label="Email"
              className="mb-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <BtFloatingTextInput
              controlId="txtTelephone"
              label="Telephone"
              className="mb-3"
              type="text"
              placeholder="Telephone"
              value={telephone}
              onChange={setTelephone}
            />

            <BtFloatingSelect
              controlId="selectCities"
              label="City"
              value={cityId}
              onChange={setCityId}
              items={cities}
            />
          </BtCard.Body>

          <BtCard.Footer className="d-flex w-100">
            <BtIconButton
              type="submit"
              variant="primary"
              onClick={handleCreate}
              className="me-2 w-100"
              icon={BsPersonAdd}
              label="Confirm"
            />

            <BtIconButton
              variant="secondary"
              onClick={() => navigate('/customers')}
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

export default CustomerCreate
