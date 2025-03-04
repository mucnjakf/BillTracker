import axios from "axios";

class CustomerService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5140/api/customers/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }

  async getTable(pageNumber = 1, pageSize = 10, searchQuery = "", sortBy = "") {
    try {
      let url = `table?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      if (searchQuery !== "") {
        url += `&searchQuery=${searchQuery}`;
      }

      if (sortBy !== "") {
        url += `&sortBy=${sortBy}`;
      }

      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async get(customerId) {
    try {
      const response = await this.api.get(customerId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async create(name, surname, email, telephone, cityId) {
    try {
      await this.api.post("", {
        name: name,
        surname: surname,
        email: email,
        telephone: telephone,
        cityId: cityId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(customerId, name, surname, email, telephone, cityId) {
    try {
      await this.api.put(customerId, {
        name: name,
        surname: surname,
        email: email,
        telephone: telephone,
        cityId: cityId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CustomerService();
