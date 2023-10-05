import { useEffect, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { authServices } from "../../services";
import { setAuth, setUser } from "../../redux/slices";
import { getItemLocalStorage, handleError } from "../../utils";
import { keysConfig } from "../../configs";
import { useAppDispatch } from "..";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(true);
  const { AuthKeys } = keysConfig;
  const dispatch = useAppDispatch();

  const authenticateUserWithRefreshToken = async (error: AxiosError | any) => {
    // Error is expiredToken
    if (isAxiosError(error) && error.response?.status === 401) {
      try {
        const { accessToken, refreshToken, user } =
          await authServices.refreshToken({
            refreshToken: getItemLocalStorage(AuthKeys.REFRESH_TOKEN),
          });

        dispatch(setAuth({ accessToken, refreshToken, userId: user._id }));
        dispatch(setUser(user));
        setIsAuthenticated(true);
        setIsLoadingVerify(false);
      } catch (refreshError) {
        handleError(refreshError);
        setIsAuthenticated(false);
        setIsLoadingVerify(false);
      }
    } else {
      handleError(error);
      setIsAuthenticated(false);
      setIsLoadingVerify(false);
    }
  };
  const authenticateUser = async () => {
    try {
      const { success, user } = await authServices.me();
      if (success) {
        setIsAuthenticated(true);
        setIsLoadingVerify(false);
        dispatch(setUser(user));
      }
    } catch (error) {
      setIsLoadingVerify(true);
      authenticateUserWithRefreshToken(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [dispatch]);

  return { isAuthenticated, isLoadingVerify };
};
