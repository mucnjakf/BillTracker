import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const BtSort = ({ sortBy, options, onChange, setCurrentPage }) => {
  return (
    <FloatingLabel
      controlId="selectSortBy"
      label="Sort by"
      style={{ width: "200px" }}
      value={sortBy}
      onChange={(e) => {
        onChange(e.target.value);
        setCurrentPage(1);
      }}
    >
      <Form.Select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

export default BtSort;
