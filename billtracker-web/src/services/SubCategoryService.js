import axios from 'axios'

class SubCategoryService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/subcategories/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async getCategorySubCategoriesAll (categoryId) {
    try {
      const response = await this.api.get(`?categoryId=${categoryId}`)
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

  async getSubCategoryTable (pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
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

  async getCategorySubCategoryList (categoryId, pageNumber = 1, pageSize = 10) {
    try {
      const response = await this.api.get(`list?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getCategorySubCategoryTable (categoryId, pageNumber = 1, pageSize = 10, searchQuery = '', sortBy = '') {
    try {
      let url = `table?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`

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

  async getCategorySubCategoriesLatest (categoryId) {
    try {
      const response = await this.api.get(`latest?categoryId=${categoryId}`)
      return { data: response.data, error: null }
    } catch {
      return { data: null, error: 'Unknown error occurred.' }
    }
  }

  async getSubCategory (subCategoryId) {
    try {
      const response = await this.api.get(subCategoryId)
      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Sub-category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async createSubCategory (name, categoryId) {
    try {
      await this.api.post('', {
        name: name,
        categoryId: categoryId,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Sub-category already exists.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async updateSubCategory (subCategoryId, name, categoryId) {
    try {
      await this.api.put(subCategoryId, {
        name: name,
        categoryId: categoryId,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Sub-category already exists.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Sub-category or category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async deleteSubCategory (subCategoryId) {
    try {
      await this.api.delete(subCategoryId)
      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Sub-category contains products.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'Sub-category not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new SubCategoryService()