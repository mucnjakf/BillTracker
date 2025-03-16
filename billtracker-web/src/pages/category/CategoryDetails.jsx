import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtRowCol from '../../components/BtRowCol'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCardText, BsTag } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import CategoryService from '../../services/CategoryService.js'
import SubCategoryService from '../../services/SubCategoryService.js'

const CategoryDetails = () => {
  const navigate = useNavigate()

  const { categoryId } = useParams()

  const [category, setCategory] = useState({})
  const [categorySubCategories, setCategorySubCategories] = useState([])

  const [error, setError] = useState(null)

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

  useEffect(() => {
    const getCategorySubCategories = async () => {
      const { data, error } = await SubCategoryService.getCategorySubCategoriesLatest(categoryId)

      if (error) {
        setError(error)
        return
      }

      setCategorySubCategories(data)
    }

    getCategorySubCategories()
  }, [categoryId])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: category.name },
        ]}
      />

      <BtPageTitle text={`${category.name} details`}/>

      <BtCard className="mb-3" width="1000px">
        <BtCard.Body>
          {error && <BtAlert variant="danger" text={error}/>}

          <BtRowCol
            columns={[
              { size: 'col-6', label: 'ID', value: category.id },
              { size: 'col-6', label: 'GUID', value: category.guid },
            ]}
          />

          <BtRowCol
            isLastRow={true}
            columns={[
              { size: 'col-6', label: 'Name', value: category.name },
              { size: 'col-6', label: 'Created', value: category.createdUtc },
            ]}
          />
        </BtCard.Body>
      </BtCard>

      <div className="d-flex mb-5">
        <BtButton
          variant="secondary"
          onClick={() => navigate(`update?returnUrl=/categories/${categoryId}`)}
          icon={BsPencilSquare}
          label="Update"
          className="me-3"
        />

        <BtButton
          variant="danger"
          onClick={() => navigate(`delete?returnUrl=/categories/${categoryId}`)}
          icon={BsTrash}
          label="Delete"
        />
      </div>

      <div style={{ width: '1000px' }}>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="mb-0">Latest sub-categories</h3>

          <BtButton
            variant="primary"
            onClick={() => navigate(`subcategories`)}
            icon={BsTag}
            label="See all"
          />
        </div>

        <BtListGroup
          items={categorySubCategories}
          renderListItem={(subCategory) => (
            <>
              <div className="d-flex justify-content-between w-100 me-4 align-items-center">
                <div className="fw-bold">
                  {subCategory.name}
                </div>
                <div>
                  <span className="small text-muted">Products:</span> <span
                  className="fw-bold">{subCategory.productsCount}</span>
                </div>
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => navigate(`subcategories/${subCategory.id}`)}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>
      </div>
    </>
  )
}

export default CategoryDetails
