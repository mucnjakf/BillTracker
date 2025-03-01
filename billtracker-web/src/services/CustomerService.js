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

  async getTable(pageNumber = 1, pageSize = 10, searchQuery = "") {
    try {
      let url = `table?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      if (searchQuery !== "") {
        url += `&searchQuery=${searchQuery}`;
      }

      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CustomerService();
