import axios from "./axios";

function getTags() {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(`/tags`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getTags };
