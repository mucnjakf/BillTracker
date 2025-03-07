import Form from 'react-bootstrap/Form'
import AuthService from '../../services/AuthService'
import BtCard from '../../components/BtCard'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtIconButton from '../../components/BtIconButton'
import BtPageTitle from '../../components/BtPageTitle'
import BtFloatingTextInput from '../../components/BtFloatingTextInput'
import BtAlert from '../../components/BtAlert'
import { useAuth } from '../../components/BtAuthProvider'
import { useState, useEffect } from 'react'
import { BsPen, BsXCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router'

// TODO: errors, validation
const AccountUpdate = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const data = await AuthService.getUser(user.id)

      setName(data.name)
      setSurname(data.surname)
      setEmail(data.email)
    }

    getUser()
  }, [user.id])

  const handleUpdate = async (e) => {
    e.preventDefault()

    await AuthService.updateUser(user.id, name, surname, email, password)
    navigate('/logout')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          { label: 'Update' },
        ]}
      />

      <BtPageTitle text="Account update"/>

      <Form>
        <BtCard width="500px">
          <BtCard.Body>
            <BtAlert
              variant="warning"
              text="After updating account, you will be logged out!"
            />

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
            <div className="d-flex w-100">
              <BtIconButton
                type="submit"
                variant="primary"
                onClick={handleUpdate}
                className="me-2 w-100"
                icon={BsPen}
                label="Confirm"
              />

              <BtIconButton
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
