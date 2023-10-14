import { api, getConfigsWithAccessToken } from "../utils";
import {
  DataLogout,
  DataRefreshToken,
  DataRevokeTokens,
  DataSignIn,
  DataSignUp,
  ApiResponse,
  UserResponse,
  UserTokensResponse,
} from "../types";

const baseRequest = "/auth";

const signUp = async (dates: DataSignUp) => {
  const { data } = await api.post<UserResponse>(`${baseRequest}/signup`, dates);
  return data;
};

const signIn = async (dates: DataSignIn) => {
  const { data } = await api.post<UserTokensResponse>(
    `${baseRequest}/signin`,
    dates,
  );
  return data;
};

const refreshToken = async (dates: DataRefreshToken) => {
  const { data } = await api.post<UserTokensResponse>(
    `${baseRequest}/refreshtoken`,
    dates,
  );
  return data;
};

const revokeTokens = async (dates: DataRevokeTokens) => {
  const { data } = await api.post<ApiResponse>(
    `${baseRequest}/revoketokens`,
    dates,
    getConfigsWithAccessToken(),
  );
  return data;
};

const me = async () => {
  const { data } = await api.get<UserResponse>(
    `${baseRequest}/me`,
    getConfigsWithAccessToken(),
  );
  return data;
};

const logout = async (dates: DataLogout) => {
  const { data } = await api.post<ApiResponse>(`${baseRequest}/logout`, dates);
  return data;
};

export default {
  signIn,
  signUp,
  me,
  refreshToken,
  revokeTokens,
  logout,
}
