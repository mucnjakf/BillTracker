import BtBreadcrumb from '../../components/BtBreadcrumb'
import BtCard from '../../components/BtCard'
import BtButton from '../../components/BtButton.jsx'
import BtRowCol from '../../components/BtRowCol'
import BtPageTitle from '../../components/BtPageTitle'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { BsTrash, BsPencilSquare, BsCardText } from 'react-icons/bs'
import BtAlert from '../../components/BtAlert.jsx'
import BtListGroup from '../../components/BtListGroup.jsx'
import Button from 'react-bootstrap/Button'
import BtPagination from '../../components/BtPagination.jsx'
import CategoryService from '../../services/CategoryService.js'
import SubCategoryService from '../../services/SubCategoryService.js'

const CategoryDetails = () => {
  const navigate = useNavigate()

  const { categoryId } = useParams()

  const [category, setCategory] = useState({})
  const [pagedCategorySubCategories, setPagedCategorySubCategories] = useState({ items: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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
      const { data, error } = await SubCategoryService.getCategorySubCategoryList(categoryId, currentPage, pageSize)

      if (error) {
        setError(error)
        return
      }

      setPagedCategorySubCategories(data)
    }

    getCategorySubCategories()
  }, [categoryId, currentPage, pageSize])

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: `${category.name}` },
        ]}
      />

      <BtPageTitle text="Category details"/>

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
        <h3 className="mb-3">Sub-categories</h3>

        <BtListGroup
          items={pagedCategorySubCategories.items}
          renderListItem={(subCategory) => (
            <>
              <div className="fw-bold d-flex align-items-center">
                {subCategory.name}
              </div>

              <Button
                className="pb-2"
                variant="primary"
                onClick={() => location.href = `/subcategories/${subCategory.id}`}
              >
                <BsCardText/>
              </Button>
            </>
          )}/>

        {pagedCategorySubCategories.items.length > 0 && (
          <BtPagination
            currentPage={currentPage}
            totalPages={pagedCategorySubCategories.totalPages}
            totalItems={pagedCategorySubCategories.items.length}
            totalCount={pagedCategorySubCategories.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}

export default CategoryDetails
