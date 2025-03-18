import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/general/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import CityService from '../../services/CityService.js'

const CityDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { cityId } = useParams()

  const [city, setCity] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/cities'

  useEffect(() => {
    const getCity = async () => {
      const { data, error } = await CityService.getCity(cityId)

      if (error) {
        setError(error)
        return
      }

      setCity(data)
    }

    getCity()
  }, [cityId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await CityService.deleteCity(cityId)

    if (error) {
      setError(error)
      return
    }

    navigate('/cities')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Cities', href: '/cities', isActive: true },
          returnUrl.startsWith('/cities/')
            ? { label: city.name, href: `/cities/${cityId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${city.name}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete city?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: city.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: city.id },
              { size: 'col-6', label: 'Name', value: city.name },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Created', value: city.createdUtc },
            ]}/>
        </BtCard.Body>

        <BtCard.Footer>
          <div className="d-flex w-100">
            <BtButton
              variant="danger"
              onClick={handleDelete}
              className="me-2 w-100"
              icon={BsCheckCircle}
              label="Confirm"
            />

            <BtButton
              variant="secondary"
              onClick={() => navigate(returnUrl)}
              className="w-100"
              icon={BsXCircle}
              label="Cancel"
            />
          </div>
        </BtCard.Footer>
      </BtCard>
    </>
  )
}

export default CityDelete
