import Form from 'react-bootstrap/Form'
import CityService from '../../services/CityService'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'

const CityCreate = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { data: cityId, error } = await CityService.createCity(name)

    if (error) {
      setError(error)
      return
    }

    navigate(`/cities/${cityId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Cities', href: '/cities', isActive: true },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Create city"/>

      <Form noValidate validated={validated} onSubmit={handleCreate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
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
              onClick={() => navigate('/cities')}
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

export default CityCreate
