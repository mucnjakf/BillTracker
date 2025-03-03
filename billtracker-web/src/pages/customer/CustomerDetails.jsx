import { useParams } from "react-router";

const CustomerDetails = () => {
  const { customerId } = useParams();

  return <h1>Custoemr details - {customerId}</h1>;
};

export default CustomerDetails;
