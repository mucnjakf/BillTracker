import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { BsSearch } from "react-icons/bs";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const BtSearch = ({ searchQuery, placeholder, onChange, setCurrentPage }) => {
  return (
    <InputGroup className="me-3" style={{ width: "300px" }}>
      <InputGroup.Text>
        <BsSearch />
      </InputGroup.Text>

      <FloatingLabel controlId="txtSearchQuery" label={placeholder}>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            onChange(e.target.value);
            setCurrentPage(1);
          }}
        />
      </FloatingLabel>
    </InputGroup>
  );
};

export default BtSearch;
