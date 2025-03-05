import Card from "react-bootstrap/Card";
import React from "react";

const BtCard = ({ width, className, children }) => {
  const body = React.Children.toArray(children).find(
    (child) => child.type === BtCard.Body
  );
  const footer = React.Children.toArray(children).find(
    (child) => child.type === BtCard.Footer
  );

  return (
    <Card style={{ width: width }} className={className}>
      <Card.Body>{body}</Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
};

BtCard.Body = function BtCardBody({ children }) {
  return <>{children}</>;
};

BtCard.Footer = function BtCardFooter({ children }) {
  return <>{children}</>;
};

export default BtCard;
