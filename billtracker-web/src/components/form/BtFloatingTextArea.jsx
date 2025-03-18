import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const BtFloatingTextArea = ({ controlId, label, placeholder, className, value, onChange, required }) => {
  return (
    <FloatingLabel controlId={controlId} label={label} className={className}>
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        style={{ height: '150px' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      <Form.Control.Feedback type="invalid">{placeholder} is required</Form.Control.Feedback>
    </FloatingLabel>
  )
}

export default BtFloatingTextArea