import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import { useState } from 'react'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'

const Login = () => {
  const { setAccessToken } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { data, error } = await AuthService.loginUser(email, password)

    if (error) {
      setError(error)
      return
    }

    setAccessToken(data.accessToken)
    location.href = '/'
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleLogin}>
      <BtPageTitle text="Login"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

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
          <BtButton
            type="submit"
            variant="primary"
            className="w-100"
            icon={BsBoxArrowInLeft}
            label="Login"
          />
        </BtCard.Footer>
      </BtCard>
    </Form>
  )
}

export default Login
