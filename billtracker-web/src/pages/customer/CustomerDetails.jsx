import { useParams } from "react-router";

// TODO: authorize
function CustomerDetails() {
  const { customerId } = useParams();

  return <h1>Custoemr details - {customerId}</h1>;
}

export default CustomerDetails;
