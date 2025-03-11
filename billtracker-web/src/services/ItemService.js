import axios from 'axios'

class ItemService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/bills',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getList (billId) {
    try {
      const response = await this.api.get(`${billId}/items/list`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }
}

export default new ItemService()