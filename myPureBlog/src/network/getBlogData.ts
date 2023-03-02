import axios from "./axios";

async function getBlogData() {
  let response = await axios.get(`/blog_data`);
  return response.data[0];
}

export { getBlogData };
