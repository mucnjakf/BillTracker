import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import BtBreadcrumb from '../../components/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/BtPageTitle.jsx'
import Form from 'react-bootstrap/Form'
import BtCard from '../../components/BtCard.jsx'
import BtAlert from '../../components/BtAlert.jsx'
import BtFloatingTextInput from '../../components/BtFloatingTextInput.jsx'
import BtFloatingSelect from '../../components/BtFloatingSelect.jsx'
import BtButton from '../../components/BtButton.jsx'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import SubCategoryService from '../../services/SubCategoryService.js'
import CategoryService from '../../services/CategoryService.js'

const SubCategoryUpdate = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const { subCategoryId } = useParams()

  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(null)

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const returnUrl =
    new URLSearchParams(location.search).get('returnUrl') || '/subcategories'

  useEffect(() => {
    const getSubCategory = async () => {
      const { data, error } = await SubCategoryService.getSubCategory(subCategoryId)

      if (error) {
        setError(error)
        return
      }

      setName(data.name)
      setCategoryId(data.categoryId)
    }

    getSubCategory()
  }, [subCategoryId])

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await CategoryService.getCategoriesAll()

      if (error) {
        setError(error)
        return
      }

      setCategories(data)
    }

    getCategories()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { error } = await SubCategoryService.updateSubCategory(
      subCategoryId,
      name,
      categoryId,
    )

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
          { label: 'Sub-categories', href: '/subcategories', isActive: true },
          returnUrl.startsWith('/subcategories/')
            ? { label: name, href: `/subcategories/${subCategoryId}`, isActive: true }
            : null,
          { label: 'Update' },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Sub-category update"/>

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

            <BtFloatingSelect
              controlId="selectCategories"
              label="Category"
              value={categoryId}
              onChange={(id) => setCategoryId(Number(id))}
              items={categories}
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

export default SubCategoryUpdate