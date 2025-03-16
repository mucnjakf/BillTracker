import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart, Pie, PieChart,
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

const Dashboard = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [salesByCategory, setSalesByCategory] = useState([])

  useEffect(() => {
    const getSalesTrendOverTime = async () => {
      const { data, error } = await BillService.getSalesTrendOverTime()

      setSalesTrendOverTime(data)
    }

    const getTopSellingProducts = async () => {
      const { data, error } = await ItemService.getTopSellingProducts()

      setTopSellingProducts(data)
    }

    const getSalesByCategory = async () => {
      const { data, error } = await CategoryService.getSalesByCategory()

      setSalesByCategory(data)
    }

    getSalesTrendOverTime()
    getTopSellingProducts()
    getSalesByCategory()
  }, [])

  return (
    <>
      <h1 className="mb-3">Dashboard</h1>

      <Container fluid>
        <Row>
          <Col className="col-4 ps-0">
            <h3>Sales trend over time</h3>

            <div className="border rounded pt-4 pe-4 pb-3">
              <ResponsiveContainer height={300}>
                <LineChart data={salesTrendOverTime}>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Line type="monotone" name="Total sales" dataKey="totalSales" stroke="#8884d8"/>
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
                  <Bar dataKey="quantitySold" name="Quantity sold" fill="#82ca9d"/>
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
                       cy="50%" outerRadius={80} fill="#ffc658" label/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
