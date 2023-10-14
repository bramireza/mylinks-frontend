import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "@/hooks";
import { setAuth, setUser } from "@/redux/slices";
import { API_URL, RouteKeys } from "@/configs";

export const useGoogleLoginConfig = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSuccess = async (codeResponse: CodeResponse) => {
    try {
      const {data} = await axios.post(`${API_URL}/auth/google`, {
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
