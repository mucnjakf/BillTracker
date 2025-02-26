import { useState, useEffect } from "react";
import CustomerService from "../services/CustomerService";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const data = await CustomerService.getAll();
      setCustomers(data);
      console.log(data);
    };

    getCustomers();
  }, []);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Table striped hover>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {customers.length < 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.telephone}</td>
                  <td>{customer.cityId ? customer.cityId : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Customers;
