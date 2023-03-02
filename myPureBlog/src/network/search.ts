import axios from "./axios";

async function search(params:string) {
  let response = await axios.get(`/search?text=${params}`);
  return response.data;
}

async function searchByTag(params:string |string[]) :Promise<any> {
  let response = await axios.get(`/search/tags?text=${params}`);
  return response;
}
export { search, searchByTag };
