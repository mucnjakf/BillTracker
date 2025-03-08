import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtCard from '../../components/BtCard'
import BtIconButton from '../../components/BtIconButton'
import BtPageTitle from '../../components/BtPageTitle'
import { useAuth } from '../../components/BtAuthProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BsBoxArrowInLeft } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'

// TODO: validation
const Login = () => {
  const { setAccessToken } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await AuthService.login(email, password)

    if (error) {
      setError(error)
      return
    }

    setAccessToken(data.accessToken)
    navigate('/')
  }

  return (
    <Form>
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
            onClick={handleLogin}
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
