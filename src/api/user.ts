import { api } from "../utils";

const baseRequest = "/user";

const getUserProfile = async (username: string) => {
  const { data } = await api.get(`${baseRequest}/${username}`);

  return data;
}

export default {
  getUserProfile
}