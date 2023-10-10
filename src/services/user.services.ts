import { api } from "../utils";

const baseRequest = "/user";

export const getUserProfile = async (username: string) => {
  const { data } = await api.get(`${baseRequest}/${username}`);

  return data;
}