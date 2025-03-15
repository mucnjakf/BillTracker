import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import SubCategoryService from '../../services/SubCategoryService.js'

const CategorySubCategoryUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { categoryId, subCategoryId } = useParams()

  const [categoryName, setCategoryName] = useState('')
  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || `/categories/${categoryId}/subcategories`

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getSubCategory(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setCategoryName(data.categoryName)
      setName(data.name)
    }

    getSubCategory()
  }, [subCategoryId])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await SubCategoryService.updateSubCategory(categoryId, subCategoryId, name)

    if (error) {
      setError(error)
      return
    }

    navigate(returnUrl)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: categoryName, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          returnUrl.startsWith(`/categories/${categoryId}/subcategories/`)
            ? { label: name, href: `/categories/${categoryId}/subcategories/${subCategoryId}`, isActive: true }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Category sub-category update"/>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              className="mb-3"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
              required={true}
            />
          </BtCard.Body>

          <BtCard.Footer className="d-flex w-100">
            <BtButton
              type="submit"
              variant="primary"
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
          </BtCard.Footer>
        </BtCard>
      </Form>
    </>
  )
}

export default CategorySubCategoryUpdate