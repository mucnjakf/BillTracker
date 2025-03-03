import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5140/api/auth/",
      headers: {
        "Content-Type": "application/json",
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
}

export default new AuthService();
