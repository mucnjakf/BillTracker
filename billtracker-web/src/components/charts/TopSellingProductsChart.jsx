import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const TopSellingProductsChart = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([])

  useEffect(() => {
    const getTopSellingProducts = async () => {
      const { data } = await ItemService.getTopSellingProducts()
      setTopSellingProducts(data)
    }

    getTopSellingProducts()
  }, [])

  return (
    <div className="border rounded p-3">
      <h4 className="mb-4">Top selling products</h4>

      <ResponsiveContainer height={300}>
        <BarChart data={topSellingProducts}>
          <XAxis dataKey="productName"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="quantitySold" name="Quantity sold" fill="#0062cc"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TopSellingProductsChart