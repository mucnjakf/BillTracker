import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BillingActivityChart = () => {
  const [billActivity, setBillActivity] = useState([])

  useEffect(() => {
    const getBillActivity = async () => {
      const { data } = await BillService.getBillActivity()
      const formattedData = data.map(item => ({
        ...item,
        date: new Intl.DateTimeFormat('hr-HR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(item.date)),
      }))

      setBillActivity(formattedData)
    }

    getBillActivity()
  }, [])

  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Billing activity</h4>

      <ResponsiveContainer height={300}>
        <AreaChart data={billActivity}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Area type="monotone" dataKey="billCount" name="Bills" stroke="#2D1E2F" fill="#a51d2a"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BillingActivityChart