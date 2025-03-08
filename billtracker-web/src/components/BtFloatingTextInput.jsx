import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const BtFloatingTextInput = ({
  controlId,
  label,
  className,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <FloatingLabel controlId={controlId} label={label} className={className}>
      <Form.Control
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{placeholder} is required</Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default BtFloatingTextInput
