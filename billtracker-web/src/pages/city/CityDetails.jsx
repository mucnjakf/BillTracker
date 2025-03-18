import BtBreadcrumb from '../../components/general/BtBreadcrumb.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCardText } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import CityService from '../../services/CityService.js'
import BtListGroup from '../../components/display/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import BtPagination from '../../components/datagrid/BtPagination.jsx'
import CustomerService from '../../services/CustomerService.js'

const CityDetails = () => {
  const navigate = useNavigate()

  const { cityId } = useParams()

  const [city, setCity] = useState({})

  const [pagedCityCustomers, setPagedCityCustomers] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [error, setError] = useState(null)

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

  useEffect(() => {
    const getCityCustomers = async () => {
      const { data, error } = await CustomerService.getCityCustomerList(cityId, currentPage, pageSize)

      if (error) {
        setError(error)
        return
      }

      setPagedCityCustomers(data)
    }

    getCityCustomers()
  }, [cityId, currentPage, pageSize])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Cities', href: '/cities', isActive: true },
          { label: city.name },
        ]}
      />

      <BtPageTitle text={`${city.name} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: city.id },
              { size: 'col-6', label: 'GUID', value: city.guid },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Name', value: city.name },
              { size: 'col-6', label: 'Created', value: city.createdUtc },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/cities/${cityId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/cities/${cityId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <h3 className="mb-3">Customers</h3>

        <BtListGroup
          items={pagedCityCustomers.items}
          renderListItem={(customer) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div className="fw-bold">
                  {customer.name} {customer.surname}
                </div>
                <div className="small">
                  {customer.email}
                </div>
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => location.href = `/customers/${customer.id}`}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>

        {pagedCityCustomers.items.length > 0 && (
          <BtPagination
            currentPage={currentPage}
            totalPages={pagedCityCustomers.totalPages}
            totalItems={pagedCityCustomers.items.length}
            totalCount={pagedCityCustomers.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

export default CityDetails
