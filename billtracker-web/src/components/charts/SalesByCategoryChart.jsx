import { useEffect, useState } from 'react'
import CategoryService from '../../services/CategoryService.js'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import CurrencyUtilities from '../../utilities/CurrencyUtilities.js'
import BtAlert from '../general/BtAlert.jsx'

const SalesByCategoryChart = () => {
  const [salesByCategory, setSalesByCategory] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    const getSalesByCategory = async () => {
      const { data, error } = await CategoryService.getSalesByCategory()

      if (error) {
        setError(error)
        return
      }

      setSalesByCategory(data)
    }

    getSalesByCategory()
  }, [])

  return (
    <div className="border rounded p-3">
      {error && <BtAlert variant="danger" text={error}/>}

      <h4 className="mb-4">Sales by category</h4>

      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={salesByCategory}
            dataKey="totalSales"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#208637"
            label={({ name }) => name}/>
          <Tooltip formatter={(value) => CurrencyUtilities.formatCurrency(value)}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesByCategoryChart