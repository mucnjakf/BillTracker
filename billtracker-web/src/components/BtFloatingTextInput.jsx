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
}) => {
  return (
    <FloatingLabel controlId={controlId} label={label} className={className}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FloatingLabel>
  )
}

export default BtFloatingTextInput
