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
}

export default new SubCategoryService()