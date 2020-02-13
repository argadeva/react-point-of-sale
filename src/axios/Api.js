import axios from "axios";

export default axios.create({
  baseURL: "https://pos.decoqu.com/api/v1/"
});
