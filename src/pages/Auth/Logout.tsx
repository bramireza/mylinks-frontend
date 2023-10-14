import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { resetAuth, resetUser } from "@/redux/slices";
import { generateQueryStringWithParams, handleError } from "@/utils";
import { Loading } from "@/components";
import { auth } from "@/api";
import { RouteKeys } from "@/configs";

const Logout = () => {
  const [isLoading, _setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    const queryStringWithParams = generateQueryStringWithParams();
    if (accessToken && refreshToken) {
      auth
        .logout({ accessToken, refreshToken })
        .then(() => {
          dispatch(resetAuth());
          dispatch(resetUser());
          navigate(`/${RouteKeys.LOGIN}?${queryStringWithParams}`, {
            replace: true,
          });
        })
        .catch((error) => {
          handleError(error);
        });
    }
  }, []);

  return <>{isLoading ? <Loading /> : <div>Logout</div>}</>;
};
export default Logout;
