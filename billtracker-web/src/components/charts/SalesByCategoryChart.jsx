import { useEffect, useState } from 'react'
import CategoryService from '../../services/CategoryService.js'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const SalesByCategoryChart = () => {
  const [salesByCategory, setSalesByCategory] = useState([])

  useEffect(() => {
    const getSalesByCategory = async () => {
      const { data } = await CategoryService.getSalesByCategory()
      setSalesByCategory(data)
    }

    getSalesByCategory()
  }, [])

  return (
    <>
      <h3>Sales by category</h3>

      <div className="border rounded p-3">
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie data={salesByCategory} dataKey="totalSales" nameKey="category" cx="50%"
                 cy="50%" outerRadius={80} fill="#ffd166" label/>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default SalesByCategoryChart