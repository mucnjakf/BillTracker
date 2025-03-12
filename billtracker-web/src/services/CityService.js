import axios from 'axios'

class CityService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/cities/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getCityTable (pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
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

  async getCities () {
    try {
      const response = await this.api.get()
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
}

export default new CityService()
