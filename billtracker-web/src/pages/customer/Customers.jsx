import { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  BsSearch,
  BsCardText,
  BsPen,
  BsTrash,
  BsArrowBarLeft,
  BsArrowBarRight,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

function Customers() {
  const [pagedCustomers, setPagedCustomers] = useState({
    items: [],
    totalPages: 1,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created-asc");

  useEffect(() => {
    const handler = setTimeout(() => {
      const getCustomers = async () => {
        const data = await CustomerService.getTable(
          currentPage,
          pageSize,
          searchQuery,
          sortBy
        );
        setPagedCustomers(data);
      };

      getCustomers();
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, pageSize, searchQuery, sortBy]);

  const generatePageNumbers = () => {
    const totalPages = pagedCustomers.totalPages;
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
    <>
      <h3 className="mb-3">Customers</h3>

      <div className="mb-3 d-flex">
        <InputGroup className="me-3" style={{ width: "300px" }}>
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name or surname"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </InputGroup>

        <Form.Select
          style={{ width: "200px" }}
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="created-asc">Created ASC</option>
          <option value="created-desc">Created DESC</option>
          <option value="name-asc">Name ASC</option>
          <option value="name-desc">Name DESC</option>
          <option value="surname-asc">Surname ASC</option>
          <option value="surname-desc">Surname DESC</option>
        </Form.Select>
      </div>

      <Card>
        <Card.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>City</th>
                <th style={{ width: "0px" }}></th>
              </tr>
            </thead>
            <tbody>
              {pagedCustomers.items.length ? (
                pagedCustomers.items.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.surname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.telephone}</td>
                    <td>{customer.cityName}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          variant="primary"
                          href={`customers/${customer.id}`}
                        >
                          <BsCardText />
                        </Button>
                        <Button variant="secondary">
                          <BsPen />
                        </Button>
                        <Button variant="danger">
                          <BsTrash />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {pagedCustomers.items.length ? (
        <div className="d-flex justify-content-between mt-3">
          <p className="align-content-center m-0 border px-3 rounded">
            Showing{" "}
            <span className="fw-bold">{pagedCustomers.items.length}</span> of{" "}
            <span className="fw-bold">{pagedCustomers.totalCount}</span> items
          </p>

          <div className="d-flex">
            <div className="d-flex me-3">
              <Form.Select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
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
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagedCustomers.totalPages)
                  )
                }
                disabled={currentPage === pagedCustomers.totalPages}
              >
                <BsArrowRight />
              </Button>

              <Button
                className="ms-1"
                variant="light"
                onClick={() => setCurrentPage(pagedCustomers.totalPages)}
                disabled={currentPage === pagedCustomers.totalPages}
              >
                <BsArrowBarRight />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Customers;
