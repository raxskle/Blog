import axios from "./axios";

function getBriefArticles(query:string) {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(`/articles${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getBriefArticles };
