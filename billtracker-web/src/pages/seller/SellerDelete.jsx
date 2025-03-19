import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import SellerService from '../../services/SellerService.js'

const SellerDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { sellerId } = useParams()

  const [seller, setSeller] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/sellers'

  useEffect(() => {
    const getSeller = async () => {
      const { data, error } = await SellerService.getSeller(sellerId)

      if (error) {
        setError(error)
        return
      }

      setSeller(data)
    }

    getSeller()
  }, [sellerId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await SellerService.deleteSeller(sellerId)

    if (error) {
      setError(error)
      return
    }

    navigate('/sellers')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Sellers', href: '/sellers', isActive: true },
          returnUrl.startsWith('/sellers/')
            ? { label: `${seller.firstName} ${seller.lastName}`, href: `/sellers/${sellerId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${seller.name}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete seller?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: seller.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: seller.id },
              { size: 'col-6', label: 'Created', value: seller.createdUtc },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'Name', value: seller.firstName },
              { size: 'col-6', label: 'Surname', value: seller.lastName },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-12', label: 'Permanent employee', value: seller.permanentEmployee },
            ]}
          />
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

export default SellerDelete
