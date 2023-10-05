import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import axios from "axios";
import {  envConfig, keysConfig } from "../../configs";
import { useAppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../../redux/slices";

export const useGoogleLoginConfig = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { RouteKeys } = keysConfig;
  const handleSuccess = async (codeResponse: CodeResponse) => {
    try {
      const {data} = await axios.post(`${envConfig.API_URL}/auth/google`, {
        code: codeResponse.code,
      });

      const { success, user, accessToken, refreshToken } = data;
      if (success) {
        dispatch(
          setAuth({
            accessToken,
            refreshToken,
            userId: user._id,
          }),
        );
        dispatch(setUser(user));
        navigate(`/${RouteKeys.ADMIN}`, { replace: true });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleError = (errorResponse: any) => {
    console.log(errorResponse);
  };

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
