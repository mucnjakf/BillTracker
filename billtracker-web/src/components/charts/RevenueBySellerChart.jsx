import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

const RevenueBySellerChart = () => {
  const [revenueBySeller, setRevenueBySeller] = useState([])

  useEffect(() => {
    const getRevenueBySeller = async () => {
      const { data } = await BillService.getRevenueBySeller()
      setRevenueBySeller(data)
    }

    getRevenueBySeller()
  }, [])

  const renderCustomLabel = (props) => {
    return CurrencyUtilities.formatCurrency(props)
  }

  const customTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { sellerName, totalRevenue } = payload[0].payload // Access correct payload corresponding to your data
      return (
        <div className="p-2 border bg-white">
          <p className="m-0">{`${sellerName} : ${CurrencyUtilities.formatCurrency(totalRevenue)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <h4>Monthly revenue by seller</h4>

      <div className="border rounded p-3">
        <ResponsiveContainer height={300}>
          <RadialBarChart innerRadius="10%" outerRadius="80%" data={revenueBySeller} startAngle={180}
                          endAngle={0}>
            <RadialBar minAngle={15}
                       label={{ position: 'insideStart', fill: '#ffffff', formatter: renderCustomLabel }}
                       dataKey="totalRevenue"
                       name="Total revenue"
                       nameKey="sellerName"
                       clockWise={true}/>
            <Tooltip content={customTooltip}/>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default RevenueBySellerChart