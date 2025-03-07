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

// TODO: error message, form validation
const Login = () => {
  const { setAccessToken } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const data = await AuthService.login(email, password)
    setAccessToken(data.accessToken)
    navigate('/')
  }

  return (
    <Form>
      <BtPageTitle text="Login"/>

      <BtCard width="500px">
        <BtCard.Body>
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
