import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ItemService from '../../services/ItemService.js'
import CategoryService from '../../services/CategoryService.js'
import CustomerService from '../../services/CustomerService.js'
import {
  Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'

const Dashboard = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [salesByCategory, setSalesByCategory] = useState([])
  const [billActivity, setBillActivity] = useState([])
  const [customersByCity, setCustomersByCity] = useState([])
  const [revenueBySeller, setRevenueBySeller] = useState([])

  useEffect(() => {
    const getSalesTrendOverTime = async () => {
      const { data } = await BillService.getSalesTrendOverTime()
      setSalesTrendOverTime(data)
    }

    const getTopSellingProducts = async () => {
      const { data } = await ItemService.getTopSellingProducts()
      setTopSellingProducts(data)
    }

    const getSalesByCategory = async () => {
      const { data } = await CategoryService.getSalesByCategory()
      setSalesByCategory(data)
    }

    const getBillActivity = async () => {
      const { data } = await BillService.getBillActivity()
      setBillActivity(data)
    }

    const getCustomersByCity = async () => {
      const { data } = await CustomerService.getCustomersByCity()
      setCustomersByCity(data)
    }

    const getRevenueBySeller = async () => {
      const { data } = await BillService.getRevenueBySeller()
      setRevenueBySeller(data)
    }

    getSalesTrendOverTime()
    getTopSellingProducts()
    getSalesByCategory()
    getBillActivity()
    getCustomersByCity()
    getRevenueBySeller()
  }, [])

  return (
    <>
      <h1 className="mb-3">Dashboard</h1>

      <Container fluid>
        <Row className="mb-4">
          <Col className="col-6 ps-0">
            <h3>Sales trend over time</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <LineChart data={salesTrendOverTime}>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" name="Total sales" dataKey="totalSales" stroke="#ef476f"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-6 pe-0">
            <h3>Top selling products</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <BarChart data={topSellingProducts}>
                  <XAxis dataKey="productName"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="quantitySold" name="Quantity sold" fill="#f78c6b"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="col-6 ps-0">
            <h3>Sales by categories</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <PieChart>
                  <Pie data={salesByCategory} dataKey="totalSales" nameKey="category" cx="50%"
                       cy="50%" outerRadius={80} fill="#ffd166" label/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-6 pe-0">
            <h3>Billing activity</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <AreaChart data={billActivity}>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Area type="monotone" dataKey="billCount" name="Bill count" stroke="#2D1E2F" fill="#06d6a0"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-6 ps-0">
            <h3>Customers by cities</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={customersByCity}>
                  <Tooltip/>
                  <PolarGrid/>
                  <PolarAngleAxis dataKey="cityName"/>
                  <PolarRadiusAxis/>
                  <Radar name="Customers" dataKey="customerCount" stroke="#8884d8" fill="#118ab2" fillOpacity={0.6}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-6 pe-0">
            <h3>Revenue by seller</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <RadialBarChart innerRadius="10%" outerRadius="80%" data={revenueBySeller} startAngle={180}
                                endAngle={0}>
                  <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#ffffff' }}
                             dataKey="totalRevenue" name="Total revenue" clockWise={true}/>
                  <Tooltip/>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
