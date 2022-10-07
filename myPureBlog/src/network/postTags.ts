import axios from "./axios";

async function postTags(data:{tag:string}) {
  let response = await axios.post(`/tags/addtags`, data, {
    headers: {
      Authorization: `${sessionStorage.getItem("adminToken")}`,
    },
  });
  return response.data;
}

export { postTags };
