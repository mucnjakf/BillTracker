import axios from 'axios'

class BillService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/bills/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getCustomerBillTable (customerId, pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
    try {
      let url = `table?customerId=${customerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`

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

  async getSellerBillList (sellerId, pageNumber = 1, pageSize = 10) {
    try {
      const response = await this.api.get(`list?sellerId=${sellerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getCustomerBillsLatest (customerId) {
    try {
      const response = await this.api.get(`latest?customerId=${customerId}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getCustomerBill (customerId, billId) {
    try {
      const response = await this.api.get(`${billId}?customerId=${customerId}`)
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

  async getSalesTrendOverTime () {
    try {
      const response = await this.api.get('sales-trend-over-time')
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async createBill (customerId, date, billNumber, comment, sellerId) {
    try {
      const response = await this.api.post('', {
        date: new Date(date),
        billNumber: billNumber,
        comment: comment,
        customerId: customerId,
        sellerId: sellerId,
      })

      return { data: response.data.id, error: null }
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

  async updateBill (customerId, billId, date, comment) {
    try {
      await this.api.put(`${billId}?customerId=${customerId}`, {
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

  async deleteBill (customerId, billId) {
    try {
      await this.api.delete(`${billId}?customerId=${customerId}`)
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