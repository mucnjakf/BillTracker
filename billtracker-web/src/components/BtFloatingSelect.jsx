import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const BtFloatingSelect = ({
  controlId,
  label,
  value,
  onChange,
  placeholder,
  items,
}) => {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option selected disabled>
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
}

export default BtFloatingSelect
