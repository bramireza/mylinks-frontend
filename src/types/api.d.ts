import { Link, User } from ".";

export interface ApiResponse {
  success: boolean;
  message?: string;
}
export interface UserResponse extends ApiResponse {
  user: User;
}
export interface UserTokensResponse extends UserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DataSignIn {
  email: string;
  password: string;
}
export interface DataSignUp extends DataSignIn {
  username: String;
  firstName: string;
  lastName: string;
}

export interface DataRefreshToken {
  refreshToken: string;
}
export interface DataRevokeTokens {
  userId: string;
}

export interface DataLogout {
  accessToken: string;
  refreshToken: string;
}

export interface DataCreateLink {
  name: string;
  url: string;
  active: boolean;
}

export interface LinkResponse extends ApiResponse{
  link: Link
}
export interface LinksResponse extends ApiResponse {
  links: Link[]
}