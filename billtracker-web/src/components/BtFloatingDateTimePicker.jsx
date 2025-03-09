import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const BtFloatingDateTimePicker = ({ controlId, className, required, value, onChange }) => {
  return (<FloatingLabel controlId={controlId} label="Date" className={className}>
    <Form.Control
      required={required}
      type="datetime-local"
      placeholder="Date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Form.Control.Feedback type="invalid">Date is required</Form.Control.Feedback>
  </FloatingLabel>)
}

export default BtFloatingDateTimePicker