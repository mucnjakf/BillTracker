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

// TODO: validation
const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await AuthService.register(name, surname, email, password)

    if (error) {
      setError(error)
      return
    }

    navigate('/login')
  }

  return (
    <Form>
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
            controlId="txtPassword"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </BtCard.Body>

        <BtCard.Footer>
          <BtIconButton
            type="submit"
            variant="primary"
            onClick={handleRegister}
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
