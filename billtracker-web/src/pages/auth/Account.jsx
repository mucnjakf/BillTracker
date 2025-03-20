import { useAuth } from '../../components/auth/BtAuthProvider.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BsPencilSquare, BsPersonCircle } from 'react-icons/bs'
import AuthService from '../../services/AuthService'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

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
        paths={[{ label: 'Dashboard', href: '/', isActive: true }, { label: 'Account' }]}
      />

      <BtPageTitle text="Account"/>

      <BtCard width="1000px" className="mb-3">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <Row>
            <Col className="col-3 border-end">
              {currentUser.profileImage !== undefined
                ? <Image src={`data:image/jpeg;base64,${currentUser.profileImage}`} style={{ border: '1px solid' }}
                         roundedCircle fluid/> : (
                  <div className="text-center h-100 align-content-center">
                    <BsPersonCircle style={{ width: '100px', height: '100px', marginBottom: '15px' }}/>
                    <p>No profile image</p>
                  </div>
                )}
            </Col>

            <Col className="col-9">
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
            </Col>
          </Row>
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
