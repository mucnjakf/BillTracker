import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts'

const RevenueBySellerChart = () => {
  const [revenueBySeller, setRevenueBySeller] = useState([])

  useEffect(() => {
    const getRevenueBySeller = async () => {
      const { data } = await BillService.getRevenueBySeller()
      setRevenueBySeller(data)
    }

    getRevenueBySeller()
  }, [])

  return (
    <>
      <h3>Monthly revenue by seller</h3>

      <div className="border rounded p-3">
        <ResponsiveContainer height={300}>
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={revenueBySeller} startAngle={180}
                          endAngle={0}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#ffffff' }}
                       dataKey="totalRevenue" name="Total revenue" clockWise={true}/>
            <Tooltip/>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default RevenueBySellerChart