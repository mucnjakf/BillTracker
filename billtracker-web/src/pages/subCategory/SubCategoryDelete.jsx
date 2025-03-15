import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtRowCol from '../../components/BtRowCol.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import SubCategoryService from '../../services/SubCategoryService.js'

const SubCategoryDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { subCategoryId } = useParams()

  const [subCategory, setSubCategory] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/subcategories'

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getSubCategory(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setSubCategory(data)
    }

    getSubCategory()
  }, [subCategoryId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await SubCategoryService.deleteSubCategory(subCategoryId)

    if (error) {
      setError(error)
      return
    }

    navigate('/subcategories')
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Sub-categories', href: '/subcategories', isActive: true },
          returnUrl.startsWith('/subcategories/')
            ? { label: subCategory.name, href: `/subcategories/${subCategoryId}`, isActive: true }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Sub-category delete"/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete sub-category?</p>

          <hr/>

          <div>
            <BtRowCol
              isLastRow={true}
              columns={[
                { size: 'col-4', label: 'ID', value: subCategory.id },
                { size: 'col-4', label: 'Name', value: subCategory.name },
                { size: 'col-4', label: 'Category', value: subCategory.categoryName },
              ]}
            />
          </div>
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

export default SubCategoryDelete