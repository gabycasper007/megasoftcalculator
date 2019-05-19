import axios from "axios";

var url = window.location;

export default axios.create({
  baseURL: url.protocol + "//" + url.hostname + ":8090",
  timeout: 5000
});
