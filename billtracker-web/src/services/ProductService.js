import axios from 'axios'

class ProductService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/products/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getSubCategoryProductsAll (subCategoryId) {
    try {
      const response = await this.api.get(`?subCategoryId=${subCategoryId}`)
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

  async getSubCategoryProductsLatest (subCategoryId) {
    try {
      const response = await this.api.get(`latest?subCategoryId=${subCategoryId}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }
}

export default new ProductService()