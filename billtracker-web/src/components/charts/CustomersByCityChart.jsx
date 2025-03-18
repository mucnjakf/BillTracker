import { useEffect, useState } from 'react'
import CustomerService from '../../services/CustomerService.js'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'

const CustomersByCityChart = () => {
  const [customersByCity, setCustomersByCity] = useState([])

  useEffect(() => {
    const getCustomersByCity = async () => {
      const { data } = await CustomerService.getCustomersByCity()
      setCustomersByCity(data)
    }

    getCustomersByCity()
  }, [])
  return (
    <>
      <h3>Customers by city</h3>

      <div className="border rounded p-3">
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
    </>
  )
}

export default CustomersByCityChart