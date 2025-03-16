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
    <>
      <h3>Top selling products</h3>

      <div className="border rounded pt-4 pe-4 pb-3">
        <ResponsiveContainer height={300}>
          <BarChart data={topSellingProducts}>
            <XAxis dataKey="productName"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="quantitySold" name="Quantity sold" fill="#f78c6b"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default TopSellingProductsChart