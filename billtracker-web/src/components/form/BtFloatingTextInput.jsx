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
  min,
  disabled,
  step
}) => {
  return (
    <FloatingLabel controlId={controlId} label={label} className={className}>
      <Form.Control
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        step={step}
      />
      <Form.Control.Feedback type="invalid">{placeholder} is required</Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default BtFloatingTextInput
