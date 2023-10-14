import { api, getConfigsWithAccessToken } from "../utils";
import { DataCreateLink, LinkResponse, LinksResponse } from "../types";

const baseRequest = "/link";

const createLink = async (dates: DataCreateLink) => {
  const { data } = await api.post<LinkResponse>(
    `${baseRequest}/`,
    dates,
    getConfigsWithAccessToken(),
  );
  return data;
};

const getLinksAll = async (username: string) => {
  const { data } = await api.get<LinksResponse>(
    `${baseRequest}/${username}/all`,
    getConfigsWithAccessToken(),
  );
  return data;
};

const getLinksActive = async (username: string) => {
  const { data } = await api.get<LinksResponse>(
    `${baseRequest}/${username}/active`,
  );
  return data;
};

export default {
  createLink,
  getLinksAll,
  getLinksActive
}