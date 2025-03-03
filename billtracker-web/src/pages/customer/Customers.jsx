import { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import BtSearch from "../../components/BtSearch";
import BtSort from "../../components/BtSort";
import BtPagination from "../../components/BtPagination";
import BtTable from "../../components/BtTable";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsCardText, BsPen, BsTrash, BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router";

// TODO: anonymous
function Customers() {
  const navigate = useNavigate();

  const [pagedCustomers, setPagedCustomers] = useState({
    items: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created-asc");

  const sortOptions = [
    { value: "created-asc", label: "Created ASC" },
    { value: "created-desc", label: "Created DESC" },
    { value: "name-asc", label: "Name ASC" },
    { value: "name-desc", label: "Name DESC" },
    { value: "surname-asc", label: "Surname ASC" },
    { value: "surname-desc", label: "Surname DESC" },
  ];

  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "surname", label: "Surname" },
    { key: "email", label: "Email" },
    { key: "telephone", label: "Telephone" },
    { key: "cityName", label: "City" },
  ];

  // TODO: authorize
  const tableActions = [
    {
      label: "View",
      variant: "primary",
      icon: <BsCardText />,
      onClick: (customerId) => navigate(`/customers/${customerId}`),
    },
    {
      label: "Edit",
      variant: "secondary",
      icon: <BsPen />,
      onClick: (customerId) => navigate(`/customers/${customerId}/update`),
    },
    {
      label: "Delete",
      variant: "danger",
      icon: <BsTrash />,
      onClick: (customerId) => navigate(`/customers/${customerId}/delete`),
    },
  ];

  useEffect(() => {
    const debounce = setTimeout(() => {
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

    return () => clearTimeout(debounce);
  }, [currentPage, pageSize, searchQuery, sortBy]);

  return (
    <>
      <h3 className="mb-3">Customers</h3>

      <div className="mb-3 justify-content-between d-flex">
        <div className="d-flex">
          <BtSearch
            searchQuery={searchQuery}
            onChange={setSearchQuery}
            setCurrentPage={setCurrentPage}
            placeholder="Search by name or surname"
          />

          <BtSort
            sortBy={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div>
          <Button
            variant="success"
            onClick={() => navigate(`/customers/create`)}
          >
            {/* TODO: authorize */}
            <BsPlusCircle className="me-3" />
            Create customer
          </Button>
        </div>
      </div>

      <Card>
        <Card.Body>
          <BtTable
            columns={tableColumns}
            data={pagedCustomers.items}
            actions={tableActions}
          />
        </Card.Body>
      </Card>

      {pagedCustomers.items.length ? (
        <BtPagination
          currentPage={currentPage}
          totalPages={pagedCustomers.totalPages}
          totalItems={pagedCustomers.items.length}
          totalCount={pagedCustomers.totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Customers;
