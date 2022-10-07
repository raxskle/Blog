import axios from "./axios";

async function search(params:string) {
  let response = await axios.get(`/search?text=${params}`);
  return response.data;
}

export { search };
