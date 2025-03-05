import Alert from "react-bootstrap/Alert";

const BtAlert = ({ variant, text }) => {
  return <Alert variant={variant}>{text}</Alert>;
};

export default BtAlert;
