import Form from 'react-bootstrap/Form'
import BtFloatingTextInput from '../../components/form/BtFloatingTextInput.jsx'
import BtCard from '../../components/display/BtCard.jsx'
import BtButton from '../../components/general/BtButton.jsx'
import BtBreadcrumb from '../../components/navigation/BtBreadcrumb.jsx'
import BtPageTitle from '../../components/display/BtPageTitle.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import BtAlert from '../../components/general/BtAlert.jsx'
import CategoryService from '../../services/CategoryService.js'

const CategoryCreate = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setError(null)

    const { data: categoryId, error } = await CategoryService.createCategory(name)

    if (error) {
      setError(error)
      return
    }

    navigate(`/categories/${categoryId}`)
  }

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: 'Dashboard', href: '/', isActive: true },
          { label: 'Categories', href: '/categories', isActive: true },
          { label: 'Create' },
        ]}
      />

      <BtPageTitle text="Create category"/>

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
              onClick={() => navigate('/categories')}
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

export default CategoryCreate
