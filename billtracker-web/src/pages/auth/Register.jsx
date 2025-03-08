import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtCard from '../../components/BtCard'
import BtIconButton from '../../components/BtIconButton'
import BtPageTitle from '../../components/BtPageTitle'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BsPersonPlus } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await AuthService.register(name, surname, email, password)

    if (error) {
      setError(error)
      return
    }

    navigate('/login')
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleRegister}>
      <BtPageTitle text="Register"/>

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
            controlId="txtPassword"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required={true}
          />
        </BtCard.Body>

        <BtCard.Footer>
          <BtIconButton
            type="submit"
            variant="primary"
            icon={BsPersonPlus}
            label="Register"
            className="w-100"
          />
        </BtCard.Footer>
      </BtCard>
    </Form>
  )
}

export default Register
