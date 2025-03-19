import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import CategoryService from '../../services/CategoryService.js'

const CategoryDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { categoryId } = useParams()

  const [category, setCategory] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/categories'

  useEffect(() => {
    const getCategory = async () => {
      const { data, error } = await CategoryService.getCategory(categoryId)

      if (error) {
        setError(error)
        return
      }

      setCategory(data)
    }

    getCategory()
  }, [categoryId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await CategoryService.deleteCategory(categoryId)

    if (error) {
      setError(error)
      return
    }

    navigate('/categories')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          returnUrl.startsWith('/categories/')
            ? { label: category.name, href: `/categories/${categoryId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${category.name}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete category?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: category.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: category.id },
              { size: 'col-6', label: 'Name', value: category.name },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-12', label: 'Created', value: category.createdUtc },
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

export default CategoryDelete
