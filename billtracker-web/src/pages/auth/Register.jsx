import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BsPersonCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const readProfileImage = () => {
    return new Promise((resolve, reject) => {
      if (profileImage) {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
          const base64ProfileImage = fileReader.result.split(',')[1]
          resolve(base64ProfileImage)
        }
        fileReader.onerror = () => reject('Error reading file')
        fileReader.readAsDataURL(profileImage)
      } else {
        resolve(null)
      }
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const base64ProfileImage = await readProfileImage()
    const { error } = await AuthService.registerUser(name, surname, email, password, base64ProfileImage)

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
            className="mb-4"
          />

          <Form.Group controlId="fileProfileImage">
            <Form.Label>Profile image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])}/>
          </Form.Group>
        </BtCard.Body>

        <BtCard.Footer>
          <BtButton
            type="submit"
            variant="primary"
            icon={BsPersonCircle}
            label="Register"
            className="w-100"
          />
        </BtCard.Footer>
      </BtCard>
    </Form>
  )
}

export default Register
