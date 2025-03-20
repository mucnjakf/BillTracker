import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import { useState, useEffect } from 'react'
import { BsCheckCircle, BsPersonCircle, BsXCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtCard from '../../components/display/BtCard.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import Image from 'react-bootstrap/Image'

const AccountUpdate = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [currentProfileImage, setCurrentProfileImage] = useState(null)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await AuthService.getUser(user.id)

      if (error) {
        setError(error)
        return
      }

      setName(data.name)
      setSurname(data.surname)
      setEmail(data.email)
      setProfileImage(data.profileImage)
      setCurrentProfileImage(data.profileImage)
    }

    getUser()
  }, [user.id])

  const readProfileImage = () => {
    return new Promise((resolve, reject) => {
      console.log(profileImage)

      if (profileImage instanceof File) {
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

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const base64ProfileImage = await readProfileImage()
    const { error } = await AuthService.updateUser(user.id, name, surname, email, password, base64ProfileImage)

    if (error) {
      setError(error)
      return
    }

    navigate('/logout')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Account', href: '/account', isActive: true },
          { label: 'Update' },
        ]}
      />

      <BtPageTitle text="Account update"/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtAlert
              variant="warning"
              text="After updating account, you will be logged out!"
            />

            <div className="text-center mb-3">
              {currentProfileImage !== null
                ? <Image src={`data:image/jpeg;base64,${currentProfileImage}`}
                         style={{ width: '200px', height: '200px', border: '1px solid' }}
                         roundedCircle/> : (
                  <div className="h-100 align-content-center">
                    <BsPersonCircle style={{ width: '200px', height: '200px', marginBottom: '15px' }}/>
                    <p>No profile image</p>
                  </div>
                )}
            </div>

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
              type="text"
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
              className="mb-4"
            />

            <Form.Group controlId="fileProfileImage">
              <Form.Label>Profile image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])}/>
            </Form.Group>
          </BtCard.Body>

          <BtCard.Footer>
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
                onClick={() => navigate('/account')}
                className="w-100"
                icon={BsXCircle}
                label="Cancel"
              />
            </div>
          </BtCard.Footer>
        </BtCard>
      </Form>
    </>
  )
}

export default AccountUpdate
