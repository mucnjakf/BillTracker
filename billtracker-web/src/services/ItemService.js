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

  async get (billId, itemId) {
    try {
      const response = await this.api.get(`${billId}/items/${itemId}`)
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Item not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async create (billId, quantity, productId) {
    try {
      await this.api.post(`${billId}/items`, {
        quantity: quantity,
        productId: productId,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Bill or product not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async update (billId, itemId, quantity) {
    try {
      await this.api.put(`${billId}/items/${itemId}`, {
        quantity: quantity,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Item not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async delete (billId, itemId) {
    try {
      await this.api.delete(`${billId}/items/${itemId}`)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Item not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new ItemService()