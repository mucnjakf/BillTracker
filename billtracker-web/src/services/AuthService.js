import axios from 'axios'

class AuthService {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:5140/api/auth/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  async loginUser (email, password) {
    try {
      const response = await this.api.post('login', {
        email: email,
        password: password,
      })

      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'Invalid credentials.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async registerUser (name, surname, email, password) {
    try {
      await this.api.post('register', {
        name: name,
        surname: surname,
        email: email,
        password: password,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Email is already taken.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async getUser (userId) {
    try {
      const response = await this.api.get(`users/${userId}`)

      return { data: response.data, error: null }
    } catch (error) {
      switch (error.status) {
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'User not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }

  async updateUser (userId, name, surname, email, password) {
    try {
      await this.api.put(`users/${userId}`, {
        name: name,
        surname: surname,
        email: email,
        password: password,
      })

      return { data: null, error: null }
    } catch (error) {
      switch (error.status) {
        case 400:
          return { data: null, error: 'Email is already taken.' }
        case 401:
          return { data: null, error: 'You are not authenticated.' }
        case 403:
          return { data: null, error: 'You are not authorized.' }
        case 404:
          return { data: null, error: 'User not found.' }
        default:
          return { data: null, error: 'Unknown error occurred.' }
      }
    }
  }
}

export default new AuthService()
