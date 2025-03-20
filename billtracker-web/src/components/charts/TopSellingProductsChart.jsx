import { useEffect, useState } from 'react'
import ItemService from '../../services/ItemService.js'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import BtAlert from '../general/BtAlert.jsx'

const TopSellingProductsChart = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    const getTopSellingProducts = async () => {
      const { data, error } = await ItemService.getTopSellingProducts()

      if (error) {
        setError(error)
        return
      }

      setTopSellingProducts(data)
    }

    getTopSellingProducts()
  }, [])

  return (
    <div className="border rounded p-3">
      {error && <BtAlert variant="danger" text={error}/>}

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