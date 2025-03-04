import Button from "react-bootstrap/Button";

const BtIconButton = ({ variant, onClick, icon: Icon, label, className }) => {
  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {Icon && <Icon className="me-2" />}
      {label}
    </Button>
  );
};

export default BtIconButton;
