import { useEffect, useState } from 'react'
import BillService from '../../services/BillService.js'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BillingActivityChart = () => {
  const [billActivity, setBillActivity] = useState([])

  useEffect(() => {
    const getBillActivity = async () => {
      const { data } = await BillService.getBillActivity()
      setBillActivity(data)
    }

    getBillActivity()
  }, [])

  return (
    <>
      <h3>Billing activity</h3>

      <div className="border rounded pt-4 pe-4 pb-3">
        <ResponsiveContainer height={300}>
          <AreaChart data={billActivity}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone" dataKey="billCount" name="Bills" stroke="#2D1E2F" fill="#06d6a0"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default BillingActivityChart