import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { setUser, setAuth } from "@/redux/slices";
import { authServices } from "@/services";
import { keysConfig } from "@/configs";
import { DataQueryString, ParsedQueryString, QueryStringParams } from "@/types";
import {
  useAuth,
  useGoogleLoginConfig,
  useAppDispatch,
  useAppSelector,
} from "@/hooks";
import { Box, Button, Divider, Loading, TextField } from "@/components";
import { MainLayout } from "@/layouts";
import { SvgSignin } from "@/utils";
import styles from "./styles.module.css";

const { RouteKeys } = keysConfig;

const SignIn = () => {
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleLogin = useGoogleLoginConfig();
  const { accessToken, refreshToken, userId } = useAppSelector(
    (state) => state.auth,
  );
  const currentUrl = window.location.href;
  const { query: qs }: ParsedQueryString = queryString.parseUrl(currentUrl);

  const handleRedirect = (qs: QueryStringParams, data: DataQueryString) => {
    const { urlCallback, urlRedirect } = qs;

    if (urlCallback && urlRedirect) {
      const queryObject = {
        urlRedirect,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: data.userId,
      };
      const queryStringWithParams = queryString.stringify(queryObject, {
        sort: false,
      });

      window.location.href = `${urlCallback}?${queryStringWithParams}`;
    } else {
      navigate(`/${RouteKeys.ADMIN}`, { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isAuthenticated) {
        setIsLoading(true);
        handleRedirect(qs, { accessToken, refreshToken, userId });
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken, success, user } =
        await authServices.signIn(dataForm);
      if (success) {
        dispatch(
          setAuth({
            accessToken,
            refreshToken,
            userId: user._id,
          }),
        );
        dispatch(setUser(user));
        handleRedirect(qs, { accessToken, refreshToken, userId: user._id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Box>
            <div className={styles.containerBox}>
              <div className={styles.containerHeader}>
                <SvgSignin />
                <h1>Inicio de Sesión</h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                  <TextField
                    type="text"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={dataForm.email}
                  />
                  <TextField
                    type="password"
                    label="Contraseña"
                    name="password"
                    onChange={handleChange}
                    value={dataForm.password}
                  />
                  <Button type="submit" style={{marginTop: "24px"}}>Iniciar Sesión</Button>
                </div>
              </form>
              <div className={styles.containerButton}>
                <Divider>O</Divider>
                <Button onClick={googleLogin}>Acceder con Google 🚀</Button>

                <span className="b1">
                  ¿No tienes cuenta? <br />
                  <a href={RouteKeys.SIGNUP}>
                    <span className="b2">Registrate aquí</span>
                  </a>
                </span>
              </div>
            </div>
          </Box>
        </MainLayout>
      )}
    </>
  );
};

export default SignIn;
