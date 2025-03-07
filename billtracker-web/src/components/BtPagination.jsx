import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsArrowLeft,
  BsArrowRight,
} from 'react-icons/bs'

const BtPagination = ({
  currentPage,
  totalPages,
  totalItems,
  totalCount,
  pageSize,
  setPageSize,
  setCurrentPage,
}) => {
  const generatePageNumbers = () => {
    const pageNumbers = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)

    if (totalPages > 5 && endPage === totalPages) {
      startPage = endPage - 4
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="d-flex justify-content-between mt-3">
      <p className="align-content-center m-0 border px-3 rounded">
        Showing <span className="fw-bold">{totalItems}</span> of{' '}
        <span className="fw-bold">{totalCount}</span> items
      </p>

      <div className="d-flex">
        <div className="d-flex me-3">
          <FloatingLabel
            controlId="selectPageSize"
            label="Rows per page"
            style={{ width: '150px' }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value)
              setCurrentPage(1)
            }}
          >
            <Form.Select>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </Form.Select>
          </FloatingLabel>
        </div>

        <div className="border p-2 rounded">
          <Button
            className="me-1 pb-2 btn-sm"
            variant="secondary"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <BsArrowBarLeft/>
          </Button>

          <Button
            variant="primary"
            className="pb-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <BsArrowLeft/>
          </Button>

          {generatePageNumbers().map((page) => (
            <Button
              style={{ width: '52px' }}
              key={page}
              variant={page === currentPage ? 'primary' : 'outline-primary'}
              className="mx-1 pb-2"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="primary"
            className="pb-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <BsArrowRight/>
          </Button>

          <Button
            className="ms-1 pb-2 btn-sm"
            variant="secondary"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <BsArrowBarRight/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BtPagination
