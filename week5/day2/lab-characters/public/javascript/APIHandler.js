class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    const res = await axios.get(`${this.BASE_URL}/characters`);
    return res.data;
  }

  async getOneRegister(id) {
    const res = await axios.get(`${this.BASE_URL}/characters/${id}`);
    return res.data;
  }

  async createOneRegister(data) {
    await axios.post(`${this.BASE_URL}/characters`, data);
  }

  async updateOneRegister(id, data) {
    await axios.patch(`${this.BASE_URL}/characters/${id}`, data);
  }

  async deleteOneRegister(id) {
    await axios.delete(`${this.BASE_URL}/characters/${id}`);
  }
}
