import axios from 'axios'

class ItemService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/items/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getBillItemList (billId, pageNumber = 1, pageSize = 10) {
    try {
      const response = await this.api.get(`list?billId=${billId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getBillItem (billId, itemId) {
    try {
      const response = await this.api.get(`${itemId}?billId=${billId}`)
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

  async createItem (billId, quantity, productId) {
    try {
      await this.api.post('', {
        billId: billId,
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

  async updateItem (billId, itemId, quantity) {
    try {
      await this.api.put(`${itemId}?billId=${billId}`, {
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

  async deleteItem (billId, itemId) {
    try {
      await this.api.delete(itemId)
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