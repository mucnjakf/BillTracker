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

  async getSubCategoryProductTable (subCategoryId, pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
    try {
      let url = `table?subCategoryId=${subCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`

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

  async getSubCategoryProductsLatest (subCategoryId) {
    try {
      const response = await this.api.get(`latest?subCategoryId=${subCategoryId}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getSubCategoryProduct (subCategoryId, productId) {
    try {
      const response = await this.api.get(`${productId}?subCategoryId=${subCategoryId}`)
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Product not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async createProduct (name, productNumber, color, price, subCategoryId) {
    try {
      await this.api.post('', {
        name: name,
        productNumber: productNumber,
        color: color,
        price: price,
        subCategoryId: subCategoryId,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Sub-category not found.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async deleteProduct (subCategoryId, productId) {
    try {
      await this.api.delete(`${productId}?subCategoryId=${subCategoryId}`)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Product contains items.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Product not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new ProductService()