import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import CategoryService from '../../services/CategoryService.js'
import SubCategoryService from '../../services/SubCategoryService.js'

const CategorySubCategoryCreate = () => {
  const navigate = useNavigate()

  const { categoryId } = useParams()

  const [category, setCategory] = useState({})

  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

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

  const handleCreate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { data: subCategoryId, error } = await SubCategoryService.createSubCategory(name, categoryId)

    if (error) {
      setError(error)
      return
    }

    navigate(`/categories/${categoryId}/subcategories/${subCategoryId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: category.name, href: `/categories/${categoryId}`, isActive: true },
          { label: 'Sub-categories', href: `/categories/${categoryId}/subcategories`, isActive: true },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Create sub-category"/>

      <Form noValidate validated={validated} onSubmit={handleCreate}>
        <BtCard width="500px">
          <BtCard.Body>
            {error && <BtAlert variant="danger" text={error}/>}

            <BtFloatingTextInput
              controlId="txtName"
              label="Name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={setName}
              required={true}
              className="mb-3"
            />

            <BtFloatingTextInput
              controlId="txtCategoryName"
              label="Category"
              type="text"
              placeholder="Category"
              value={category.name}
              disabled={true}
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
              onClick={() => navigate(`/categories/${categoryId}/subcategories`)}
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

export default CategorySubCategoryCreate