import axios from "axios";

class CustomerService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5140/api/customers/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getTable(pageNumber = 1, pageSize = 10) {
    try {
      const response = await this.api.get(
        `table?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CustomerService();
