import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetAuth, resetUser } from "../../redux/slices";
import { useNavigate } from "react-router-dom";
import { keysConfig } from "../../configs";
import { authServices } from "../../services";
import { generateQueryStringWithParams, handleError } from "../../utils";
import { Loading } from "../../components";

const { RouteKeys } = keysConfig;

const Logout = () => {
  const [isLoading, _setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    const queryStringWithParams = generateQueryStringWithParams();
    if (accessToken && refreshToken) {
      authServices
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
