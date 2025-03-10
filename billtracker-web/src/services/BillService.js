import axios from 'axios'

class BillService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/customers/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getTable (customerId, pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
    try {
      let url = `${customerId}/bills/table?pageNumber=${pageNumber}&pageSize=${pageSize}`

      if (searchQuery !== '') {
        url += `&searchQuery=${searchQuery}`
      }

      if (sortBy !== '') {
        url += `&sortBy=${sortBy}`
      }

      const response = await this.api.get(url)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async get (customerId, billId) {
    try {
      const response = await this.api.get(`${customerId}/bills/${billId}`)
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Bill not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async create (customerId, date, billNumber, comment, sellerId) {
    try {
      await this.api.post(`${customerId}/bills`, {
        date: new Date(date),
        billNumber: billNumber,
        comment: comment,
        sellerId: sellerId,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Customer not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async update (customerId, billId, date, comment) {
    try {
      await this.api.put(`${customerId}/bills/${billId}`, {
        date: new Date(date),
        comment: comment,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Bill not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async delete (customerId, billId) {
    try {
      await this.api.delete(`${customerId}/bills/${billId}`)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Bill contains items.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Bill not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new BillService()