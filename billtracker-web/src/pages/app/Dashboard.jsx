import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ItemService from '../../services/ItemService.js'
import CategoryService from '../../services/CategoryService.js'
import CustomerService from '../../services/CustomerService.js'

const Dashboard = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [salesByCategory, setSalesByCategory] = useState([])
  const [billActivity, setBillActivity] = useState([])
  const [customersByCity, setCustomersByCity] = useState([])

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

    getSalesTrendOverTime()
    getTopSellingProducts()
    getSalesByCategory()
    getBillActivity()
    getCustomersByCity()
  }, [])

  return (
    <>
      <h1 className="mb-3">Dashboard</h1>

      <Container fluid>
        <Row className="mb-3">
          <Col className="col-4 ps-0">
            <h3>Sales trend over time</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <LineChart data={salesTrendOverTime}>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Line type="monotone" name="Total sales" dataKey="totalSales" stroke="#F07167"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-4">
            <h3>Top selling products</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <BarChart data={topSellingProducts}>
                  <XAxis dataKey="productName"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="quantitySold" name="Quantity sold" fill="#0081A7"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-4 pe-0">
            <h3>Sales by top 5 categories</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <PieChart>
                  <Pie data={salesByCategory} dataKey="totalSales" nameKey="category" cx="50%"
                       cy="50%" outerRadius={80} fill="#333333" label/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4 ps-0">
            <h3>Billing activity</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <AreaChart data={billActivity}>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Area type="monotone" dataKey="billCount" name="Bill count" stroke="#2D1E2F" fill="#324376"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-4">
            <h3>Customers by top 5 cities</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={customersByCity}>
                  <Tooltip/>
                  <PolarGrid/>
                  <PolarAngleAxis dataKey="cityName"/>
                  <PolarRadiusAxis/>
                  <Radar name="Customers" dataKey="customerCount" stroke="#8884d8" fill="#D64933" fillOpacity={0.6}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Col>

          <Col className="col-4 pe-0">

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
