import axios from "axios";

class CustomerService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000/customer",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAll() {
    try {
      const response = await this.api.get();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CustomerService();
