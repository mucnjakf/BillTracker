import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtAlert from '../../components/general/BtAlert.jsx'
import BtRowCol from '../../components/display/BtRowCol.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import SubCategoryService from '../../services/SubCategoryService.js'

const CategorySubCategoryDelete = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { categoryId, subCategoryId } = useParams()

  const [subCategory, setSubCategory] = useState({})

  const [error, setError] = useState(null)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/categories/${categoryId}/subcategories`

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getCategorySubCategory(categoryId, subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setSubCategory(data)
    }

    getSubCategory()
  }, [categoryId, subCategoryId])

  const handleDelete = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await SubCategoryService.deleteSubCategory(categoryId, subCategoryId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/categories/${categoryId}/subcategories`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: subCategory.categoryName, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          returnUrl.startsWith(`/categories/${categoryId}/subcategories/`)
            ? {
              label: subCategory.name,
              href: `/categories/${categoryId}/subcategories/${subCategoryId}`,
              isActive: true,
            }
            : null,
          { label: 'Delete' },
        ].filter(Boolean)}
      />

      <BtPageTitle text={`Delete ${subCategory.name}`}/>

      <BtCard width="500px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <p>Are you sure you want to permanently delete sub-category?</p>

          <hr/>

          <BtRowCol
            columns={[
              { size: 'col-12', label: 'GUID', value: subCategory.guid },
            ]}
          />

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: subCategory.id },
              {
                size: 'col-6',
                label: 'Name',
                value: subCategory.name,
              },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Category', value: subCategory.categoryName },
              { size: 'col-6', label: 'Created', value: subCategory.createdUtc },
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

export default CategorySubCategoryDelete