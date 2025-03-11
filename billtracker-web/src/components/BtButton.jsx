import Button from 'react-bootstrap/Button'

const BtButton = ({
  variant,
  onClick,
  icon: Icon,
  label,
  className,
  type = 'button',
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      className={`${className} py-2 px-3`}
    >
      {Icon && <Icon className="me-2"/>}
      {label}
    </Button>
  )
}

export default BtButton
