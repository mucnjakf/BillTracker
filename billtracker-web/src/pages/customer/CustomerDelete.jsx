import CustomerService from "../../services/CustomerService";
import BtCard from "../../components/BtCard";
import BtIconButton from "../../components/BtIconButton";
import BtBreadcrumb from "../../components/BtBreadcrumb";
import BtPageTitle from "../../components/BtPageTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { BsTrash, BsXCircle } from "react-icons/bs";

const CustomerDelete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { customerId } = useParams();

  const [customer, setCustomer] = useState({});

  const returnUrl =
    new URLSearchParams(location.search).get("returnUrl") || "/customers";

  useEffect(() => {
    const getCustomer = async () => {
      const data = await CustomerService.get(customerId);
      setCustomer(data);
    };

    getCustomer();
  }, [customerId]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await CustomerService.delete(customerId);
    navigate("/customers");
  };

  return (
    <>
      <BtBreadcrumb
        paths={[
          { label: "Home", href: "/" },
          { label: "Customers", href: "/customers" },
          returnUrl.startsWith("/customers/")
            ? { label: "Details", href: `/customers/${customerId}` }
            : null,
          { label: "Delete" },
        ].filter(Boolean)}
      />

      <BtPageTitle text="Customer delete" />

      <BtCard width="500px">
        <BtCard.Body>
          <p>Are you sure you want to permanently delete customer?</p>

          <div>
            <label className="text-muted small">Name</label>
            <h5>{customer.name}</h5>

            <label className="mt-3 text-muted small">Surname</label>
            <h5>{customer.surname}</h5>

            <label className="mt-3 text-muted small">Email</label>
            <h5>{customer.email}</h5>
          </div>
        </BtCard.Body>

        <BtCard.Footer>
          <div className="d-flex w-100">
            <BtIconButton
              variant="danger"
              onClick={handleDelete}
              className="me-2 w-100"
              icon={BsTrash}
              label="Confirm"
            />

            <BtIconButton
              variant="secondary"
              onClick={() => navigate(returnUrl)}
              className="w-100"
              icon={BsXCircle}
              label="Cancel"
            />
          </div>
        </BtCard.Footer>
      </BtCard>
    </>
  );
};

export default CustomerDelete;
