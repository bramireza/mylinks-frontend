import queryString from "query-string";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { setAuth } from "../../redux/slices";
import { useNavigate } from "react-router-dom";
import { keysConfig } from "../../configs";
import { ParsedQueryString } from "../../types";

const { RouteKeys } = keysConfig;

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

  return <>{isLoading ? "Loading..." : <div>Callback</div>}</>;
};
export default Callback;
