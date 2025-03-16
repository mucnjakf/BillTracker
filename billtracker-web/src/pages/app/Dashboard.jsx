import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Dashboard = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])

  useEffect(() => {
    const getSalesTrendOverTime = async () => {
      const { data, error } = await BillService.getSalesTrendOverTime()

      setSalesTrendOverTime(data)
    }

    getSalesTrendOverTime()
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

          <Col className="col-4 pe-0">
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
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
