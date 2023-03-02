import axios from "./axios";

function getBriefArticles(params:string) {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(`/articles${params}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getBriefArticles };
