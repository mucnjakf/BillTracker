import { useAuth } from '../../components/BtAuthProvider'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BsPencilSquare } from 'react-icons/bs'
import AuthService from '../../services/AuthService'
import BtRowCol from '../../components/BtRowCol'
import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtButton from '../../components/BtButton.jsx'
import BtPageTitle from '../../components/BtPageTitle'
import BtCard from '../../components/BtCard'
import BtAlert from '../../components/BtAlert.jsx'

const Account = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  const [currentUser, setCurrentUser] = useState({})

  const [error, setError] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await AuthService.getUser(user.id)

      if (error) {
        setError(error)
        return
      }

      setCurrentUser(data)
    }

    getUser()
  }, [user.id])

  return (
    <>
      <BtBreadcrumb
        paths={[{ label: 'Home', href: '/', isActive: true }, { label: 'Account' }]}
      />

      <BtPageTitle text="Account"/>

      <BtCard width="1000px" className="mb-3">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: currentUser.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-4', label: 'ID', value: currentUser.id },
              {
                size: 'col-8',
                label: 'Created',
                value: currentUser.createdUtc,
              },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-4', label: 'Email', value: currentUser.email },
              { size: 'col-4', label: 'Name', value: currentUser.name },
              { size: 'col-4', label: 'Surname', value: currentUser.surname },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <BtButton
        variant="secondary"
        onClick={() => navigate('update')}
        icon={BsPencilSquare}
        label="Update"
      />
    </>
  )
}

export default Account
