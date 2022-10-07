import axios from "axios";
import { webURL } from "../config";
const ConfigBaseURL = `${webURL}/api`;
// https的url不可以是ip地址！！！！！！！！
// https://raxskle.fun/api
let instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 3000,
  baseURL: ConfigBaseURL, //接口请求地址
});

export default instance;
