import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/";
const instance = axios.create();

export default {
  getGeneations() {
    return instance({
      method: "GET",
      baseURL,
      url: "generation",
      responseType: "json",
    });
  },
  getGenerationDetails(id) {
    return instance({
      method: "GET",
      baseURL,
      url: `generation/${id}`,
      responseType: "json",
    });
  },
};
