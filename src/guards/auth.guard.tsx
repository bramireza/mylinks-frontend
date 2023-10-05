import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { keysConfig } from "../configs";
import { generateQueryStringWithParams } from "../utils";
import { Loading } from "../components";

interface AuthGuardProps {
  component: React.FC;
}

const AuthGuard = ({ component: Component }: AuthGuardProps) => {
  const { isAuthenticated, isLoadingVerify } = useAuth();
  const { RouteKeys } = keysConfig;

  if (isLoadingVerify) return <Loading/>;
  if (!isAuthenticated && !isLoadingVerify) {
    const queryStringWithParams = generateQueryStringWithParams();

    return (
      <Navigate to={`/${RouteKeys.LOGIN}?${queryStringWithParams}`} replace />
    );
  }
  return <Component />;
};

export default AuthGuard;
