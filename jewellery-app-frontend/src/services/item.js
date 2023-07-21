import axios from "../axios.js";

export const getAllItems = async () => {
  const { data } = await axios.get('/items');
  return data;
}
