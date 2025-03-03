import { Form } from "react-bootstrap";

const BtSort = ({ sortBy, options, onChange, setCurrentPage }) => {
  return (
    <Form.Select
      style={{ width: "200px" }}
      value={sortBy}
      onChange={(e) => {
        onChange(e.target.value);
        setCurrentPage(1);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default BtSort;
