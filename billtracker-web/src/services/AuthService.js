import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5140/api/auth/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }

  async login(email, password) {
    try {
      const response = await this.api.post("login", {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async register(name, surname, email, password) {
    try {
      await this.api.post("register", {
        name: name,
        surname: surname,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(userId) {
    try {
      const response = await this.api.get(`users/${userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userId, name, surname, email, password) {
    try {
      await this.api.put(`users/${userId}`, {
        name: name,
        surname: surname,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();
