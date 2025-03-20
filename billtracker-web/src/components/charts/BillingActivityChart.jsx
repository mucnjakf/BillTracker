import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import BtAlert from '../general/BtAlert.jsx'

const BillingActivityChart = () => {
  const [billActivity, setBillActivity] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    const getBillActivity = async () => {
      const { data, error } = await BillService.getBillActivity()

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

      setBillActivity(formattedData)
    }

    getBillActivity()
  }, [])

  return (
    <div className="border rounded p-3">
      {error && <BtAlert variant="danger" text={error}/>}

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