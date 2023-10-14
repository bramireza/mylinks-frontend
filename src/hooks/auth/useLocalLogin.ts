import { useEffect, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { setAuth, setUser } from "@/redux/slices";
import { useAppDispatch } from "@/hooks";
import { getItemLocalStorage, handleError } from "@/utils";
import { AuthKeys } from "@/configs";
import { auth } from "@/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const authenticateUserWithRefreshToken = async (error: AxiosError | any) => {
    // Error is expiredToken
    if (isAxiosError(error) && error.response?.status === 401) {
      try {
        const { accessToken, refreshToken, user } =
          await auth.refreshToken({
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
      const { success, user } = await auth.me();
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
