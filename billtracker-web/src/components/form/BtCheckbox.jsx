import Form from 'react-bootstrap/Form'

const BtCheckbox = ({id, label, isChecked, onChange}) => {
  return (
    <Form.Check
      type="checkbox"
      id={id}
      label={label}
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}>
    </Form.Check>
  )
}

export default BtCheckbox