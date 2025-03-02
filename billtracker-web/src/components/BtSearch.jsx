import { InputGroup, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

function BtSearch({ searchQuery, placeholder, onChange, setCurrentPage }) {
  return (
    <InputGroup className="me-3" style={{ width: "300px" }}>
      <InputGroup.Text>
        <BsSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          onChange(e.target.value);
          setCurrentPage(1);
        }}
      />
    </InputGroup>
  );
}

export default BtSearch;
