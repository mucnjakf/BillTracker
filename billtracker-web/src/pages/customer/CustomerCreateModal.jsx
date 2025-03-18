import Form from 'react-bootstrap/Form'
import CityService from '../../services/CityService'
import CustomerService from '../../services/CustomerService'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtButton from '../../components/BtButton.jsx'
import BtFloatingSelect from '../../components/BtFloatingSelect'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import Modal from 'react-bootstrap/Modal'

const CustomerCreateModal = ({ show, toggleModal }) => {
  const navigate = useNavigate()

  const [cities, setCities] = useState([])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [cityId, setCityId] = useState(null)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const getCities = async () => {
      const { data, error } = await CityService.getCitiesAll()

      if (error) {
        setError(error)
        return
      }

      data.unshift({ id: 0, name: '-' })
      setCities(data)
    }

    getCities()
  }, [])

  const clearForm = () => {
    setName('')
    setSurname('')
    setEmail('')
    setTelephone('')
    setCityId(null)
    setError(null)
    setValidated(false)
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

    const {
      data: customerId,
      error,
    } = await CustomerService.createCustomer(name, surname, email, telephone, cityId === 0 ? null : cityId)

    if (error) {
      setError(error)
      return
    }

    toggleModal()
    navigate(`/customers/${customerId}`)
  }

  return (
    <Modal show={show} onHide={toggleModal} backdrop="static" keyboard={false} size="md" centered>
      <Form noValidate validated={validated} onSubmit={handleCreate}>
        <Modal.Header closeButton>
          <Modal.Title>
            Create customer
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
            items={cities}
            required={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex w-100">
            <BtButton
              type="submit"
              variant="primary"
              className="me-2 w-100"
              icon={BsCheckCircle}
              label="Confirm"
            />

            <BtButton
              variant="secondary"
              onClick={() => {
                toggleModal()
                clearForm()
              }}
              className="w-100"
              icon={BsXCircle}
              label="Cancel"
            />
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CustomerCreateModal
