import axios from "axios";

export default axios.create({
  baseURL: "http://pos.decoqu.com/api/v1/"
});
