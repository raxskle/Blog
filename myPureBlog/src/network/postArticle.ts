import axios from "./axios";
interface articleData {
  title: string,
  content: string,
  class: string,
  tags: string,
  time: string,  
}

async function postArticle(data: articleData) {
  let response = await axios.post(`/article/add`, data, {
    headers: {
      Authorization: `${sessionStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
}

export { postArticle };
