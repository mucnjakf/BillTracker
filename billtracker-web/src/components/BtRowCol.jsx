import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BtRowCol = ({ columns, isLastRow }) => {
  return (
    <Row className={isLastRow ? "" : "mb-4"}>
      {columns.map((col, index) => (
        <Col key={index} className={col.size}>
          <label className="text-muted small">{col.label}</label>
          <h5>{col.value}</h5>
        </Col>
      ))}
    </Row>
  );
};

export default BtRowCol;
