import axios from "./axios";

async function login(data:{account:string,password:string}) {
  let response = await axios.post(`/blog_data/login`, data);
  return response.data.token;
}

export { login };
