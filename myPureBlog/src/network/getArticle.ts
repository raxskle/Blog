import axios from "./axios";

function getArticle(params: string) {
  // Promise后面的<any>指代的resolve里的类型，也就是之后的then的参数res
  return new Promise<any>((resolve, reject):void => {
    axios
      .get(`/article?${params}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getArticle };
