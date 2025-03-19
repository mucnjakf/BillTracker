import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'

const SalesTrendOverTimeChart = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])

  useEffect(() => {
    const getSalesTrendOverTime = async () => {
      const { data } = await BillService.getSalesTrendOverTime()
      setSalesTrendOverTime(data)
    }

    getSalesTrendOverTime()
  }, [])

  return (
    <>
      <h4>Sales trend over time</h4>

      <div className="border rounded p-3">
        <ResponsiveContainer height={300}>
          <LineChart data={salesTrendOverTime}>
            <XAxis dataKey="date"/>
            <YAxis tickFormatter={CurrencyUtilities.formatCurrency}/>
            <Tooltip formatter={(value) => CurrencyUtilities.formatCurrency(value)}/>
            <Line type="monotone" name="Total sales" dataKey="totalSales" stroke="#ef476f"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>)
}

export default SalesTrendOverTimeChart