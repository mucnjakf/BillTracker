import axios from "axios";

class CityService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5140/api/cities",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

export default new CityService();
