import axios from 'axios'

class CategoryService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/categories/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getCategoriesAll () {
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

  async getCategoryTable (pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
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

  async getCategory (categoryId) {
    try {
      const response = await this.api.get(categoryId)
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async createCategory (name) {
    try {
      await this.api.post('', {
        name: name,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Category already exists.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async updateCategory (categoryId, name) {
    try {
      await this.api.put(categoryId, {
        name: name,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Category already exists.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async deleteCategory (categoryId) {
    try {
      await this.api.delete(categoryId)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Category contains customers.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new CategoryService()