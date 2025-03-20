import Col from 'react-bootstrap/Col'
import BtDashboardCard from './BtDashboardCard.jsx'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'
import { BsCash, BsCashCoin, BsPerson, BsShop } from 'react-icons/bs'
import Row from 'react-bootstrap/Row'
import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import CustomerService from '../../services/CustomerService.js'
import SellerService from '../../services/SellerService.js'

const BtDashboardCardRow = () => {
  const [currentMonthEarnings, setCurrentMonthEarnings] = useState([])
  const [totalCustomersCount, setTotalCustomersCount] = useState([])
  const [totalBillsCount, setTotalBillsCount] = useState([])
  const [totalSellersCount, setTotalSellersCount] = useState([])

  useEffect(() => {
      const getCurrentMonthEarnings = async () => {
        const { data } = await BillService.getCurrentMonthEarnings()
        setCurrentMonthEarnings(data)
      }

      const getTotalCustomersCount = async () => {
        const { data } = await CustomerService.getTotalCustomersCount()
        setTotalCustomersCount(data)
      }

      const getTotalBillsCount = async () => {
        const { data } = await BillService.getTotalBillsCount()
        setTotalBillsCount(data)
      }

      const getTotalSellersCount = async () => {
        const { data } = await SellerService.getTotalSellersCount()
        setTotalSellersCount(data)
      }

      getCurrentMonthEarnings()
      getTotalCustomersCount()
      getTotalBillsCount()
      getTotalSellersCount()
    }, [],
  )

  return (
    <Row className="mb-4">
      <Col>
        <BtDashboardCard
          value={CurrencyUtilities.formatCurrency(currentMonthEarnings.earnings)}
          label="Earned this month"
          icon={BsCash}
        />
      </Col>

      <Col>
        <BtDashboardCard
          value={totalCustomersCount.totalCustomers}
          label="Total customers"
          icon={BsPerson}
        />
      </Col>

      <Col>
        <BtDashboardCard
          value={totalBillsCount.totalBills}
          label="Total bills"
          icon={BsCashCoin}
        />
      </Col>

      <Col>
        <BtDashboardCard
          value={totalSellersCount.totalSellers}
          label="Total sellers"
          icon={BsShop}
        />
      </Col>
    </Row>
  )
}

export default BtDashboardCardRow;