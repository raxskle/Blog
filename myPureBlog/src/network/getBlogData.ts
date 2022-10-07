import axios from "./axios";

// function getBlogData() {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`/blog_data`)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

async function getBlogData() {
  let response = await axios.get(`/blog_data`);
  return response;
}

export { getBlogData };
