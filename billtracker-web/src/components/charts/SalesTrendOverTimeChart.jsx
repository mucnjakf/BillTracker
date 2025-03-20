import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'
import BtAlert from '../general/BtAlert.jsx'

const SalesTrendOverTimeChart = () => {
  const [salesTrendOverTime, setSalesTrendOverTime] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    const getSalesTrendOverTime = async () => {
      const { data, error } = await BillService.getSalesTrendOverTime()

      if (error) {
        setError(error)
        return
      }

      const formattedData = data.map(item => ({
        ...item,
        date: new Intl.DateTimeFormat('hr-HR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(item.date)),
      }))

      setSalesTrendOverTime(formattedData)
    }

    getSalesTrendOverTime()
  }, [])

  return (
    <div className="border rounded p-3">
      {error && <BtAlert variant="danger" text={error}/>}

      <h4 className="mb-4">Sales trend over time</h4>

      <ResponsiveContainer height={300}>
        <LineChart data={salesTrendOverTime}>
          <XAxis dataKey="date"/>
          <YAxis tickFormatter={CurrencyUtilities.formatCurrency}/>
          <Tooltip formatter={(value) => CurrencyUtilities.formatCurrency(value)}/>
          <Line type="monotone" name="Total sales" dataKey="totalSales" stroke="#585f63"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesTrendOverTimeChart