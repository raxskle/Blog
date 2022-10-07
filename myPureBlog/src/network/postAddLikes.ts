import axios from "./axios";

function postAddLikes() {
  return new Promise<any>((resolve, reject) => {
    axios
      .post(`/blog_data/addLikes`,{})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { postAddLikes };
