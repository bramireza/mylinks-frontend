import React from "react";
import { keysConfig } from "../configs";
import {
  Callback,
  Admin,
  Logout,
  PageNotFound,
  SignIn,
  SignUp,
  UserProfile,
  Home,
} from "../pages";

interface IRoute {
  path: string;
  Component: React.FC;
  isPrivate: boolean;
}
const { RouteKeys } = keysConfig;
export const routes: IRoute[] = [
  {
    path: "/",
    Component: Home,
    isPrivate: false,
  },
  {
    path: "/:username",
    Component: UserProfile,
    isPrivate: false
  },
  {
    path: `/${RouteKeys.ADMIN}`,
    Component: Admin,
    isPrivate: true,
  },
  {
    path: `/${RouteKeys.SIGNUP}`,
    Component: SignUp,
    isPrivate: false,
  },
  {
    path: `/${RouteKeys.LOGIN}`,
    Component: SignIn,
    isPrivate: false,
  },
  {
    path: `/${RouteKeys.LOGOUT}`,
    Component: Logout,
    isPrivate: false,
  },
  {
    path: `/${RouteKeys.CALLBACK}`,
    Component: Callback,
    isPrivate: false,
  },
  {
    path: "*",
    Component: PageNotFound,
    isPrivate: false,
  },
];
