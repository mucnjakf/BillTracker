import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const BtFloatingSelect = ({
  controlId,
  label,
  value,
  onChange,
  items,
  required,
}) => {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Select value={value} onChange={(e) => onChange(e.target.value)} required={required}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{label} is required</Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default BtFloatingSelect
