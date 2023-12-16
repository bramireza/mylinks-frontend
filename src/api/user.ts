import { api, getConfigsWithAccessToken } from "../utils";

const baseRequest = "/user";

const getUserProfile = async (username: string) => {
  const { data } = await api.get(`${baseRequest}/${username}`);

  return data;
};
const updateUserProfile = async (id: string, dates: any) => {
  const { data } = await api.put(
    `${baseRequest}/${id}`,
    dates,
    getConfigsWithAccessToken(),
  );

  return data;
};
export default {
  getUserProfile,
  updateUserProfile,
};
