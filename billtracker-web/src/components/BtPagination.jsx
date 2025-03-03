import { Button, Form } from "react-bootstrap";
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

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
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (totalPages > 5 && endPage === totalPages) {
      startPage = endPage - 4;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="d-flex justify-content-between mt-3">
      <p className="align-content-center m-0 border px-3 rounded">
        Showing <span className="fw-bold">{totalItems}</span> of{" "}
        <span className="fw-bold">{totalCount}</span> items
      </p>

      <div className="d-flex">
        <div className="d-flex me-3">
          <Form.Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </Form.Select>
        </div>

        <div className="border p-2 rounded">
          <Button
            className="me-1"
            variant="light"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <BsArrowBarLeft />
          </Button>

          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <BsArrowLeft />
          </Button>

          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "outline-primary"}
              className="mx-1"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="secondary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <BsArrowRight />
          </Button>

          <Button
            className="ms-1"
            variant="light"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <BsArrowBarRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BtPagination;
