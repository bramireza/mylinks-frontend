import queryString from "query-string";
import { QueryStringParams } from "../types";
import { RouteKeys } from "@/configs";

export const generateQueryStringWithParams = () => {
  const currentUrl = window.location.href;
  const { origin, search } = new URL(currentUrl);

  const queryStringInUrl = queryString.parse(search);
  const queryObject: QueryStringParams = {
    urlRedirect: currentUrl,
    urlCallback: `${origin}/${RouteKeys.CALLBACK}`,
  };

  const isEmptyQueryStringInUrl = Object.keys(queryStringInUrl).length === 0;

  return queryString.stringify(
    isEmptyQueryStringInUrl ? queryObject : queryStringInUrl,
    {
      sort: false,
    },
  );
};
