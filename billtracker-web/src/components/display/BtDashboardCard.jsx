import BtCard from './BtCard.jsx'

const BtDashboardCard = ({ value, label, icon: Icon }) => {
  return (
    <BtCard>
      <BtCard.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>{value}</h1>
            <span className="text-muted">{label}</span>
          </div>

          {Icon && <Icon style={{ width: '60px', height: '60px' }}/>}
        </div>
      </BtCard.Body>
    </BtCard>
  )
}

export default BtDashboardCard