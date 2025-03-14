import axios from 'axios'

class CustomerService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/customers/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getCustomerTable (pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
    try {
      let url = `table?pageNumber=${pageNumber}&pageSize=${pageSize}`

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

  async getCityCustomerList (cityId, pageNumber = 1, pageSize = 10) {
    try {
      const response = await this.api.get(`list?cityId=${cityId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getCustomer (customerId) {
    try {
      const response = await this.api.get(customerId)
      return { data: response.data, error: null }
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

  async createCustomer (name, surname, email, telephone, cityId) {
    try {
      await this.api.post('', {
        name: name,
        surname: surname,
        email: email,
        telephone: telephone,
        cityId: cityId,
      })

      return { data: null, error: null }
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

  async updateCustomer (customerId, name, surname, email, telephone, cityId) {
    try {
      await this.api.put(customerId, {
        name: name,
        surname: surname,
        email: email,
        telephone: telephone,
        cityId: cityId,
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

  async deleteCustomer (customerId) {
    try {
      await this.api.delete(customerId)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Customer contains bills.' }
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
}

export default new CustomerService()
