import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useAppDispatch } from "@/hooks";
import { setAuth } from "@/redux/slices";
import { Loading } from "@/components";
import { ParsedQueryString } from "@/types";
import { RouteKeys } from "@/configs";

const Callback = () => {
  const [isLoading, _setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUrl = window.location.href;
  const { query: qs }: ParsedQueryString = queryString.parseUrl(currentUrl);

  useEffect(() => {
    const { urlRedirect, accessToken, refreshToken, userId } = qs;

    if (urlRedirect && accessToken && refreshToken && userId) {
      dispatch(setAuth({ accessToken, refreshToken, userId }));
      window.location.href = urlRedirect;
    } else {
      navigate(`/${RouteKeys.ADMIN}`, { replace: true });
    }
  }, []);

  return <>{isLoading ? <Loading/> : <div>Callback</div>}</>;
};
export default Callback;
