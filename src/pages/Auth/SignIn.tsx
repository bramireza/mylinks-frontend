import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Divider
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { AuthLayout } from "../../layouts";
import { setUser, setAuth } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authServices } from "../../services";
import { ButtonCustom, Loading } from "../../components";
import { keysConfig } from "../../configs";
import queryString from "query-string";
import {
  DataQueryString,
  ParsedQueryString,
  QueryStringParams,
} from "../../types";
import { useAuth, useGoogleLoginConfig } from "../../hooks";

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
        <Loading/>
      ) : (
        <AuthLayout>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicio de Sesión
            </Typography>
            <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "center", textAlign: "center" }}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    value={dataForm.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    required
                    fullWidth
                    label="Contraseña"
                    id="password"
                    name="password"
                    autoComplete="password"
                    onChange={handleChange}
                    value={dataForm.password}
                  />
                </Grid>
                <Grid item>
                  <ButtonCustom>Iniciar Sesión</ButtonCustom>
                </Grid>
              </Grid>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "center", textAlign: "center" }}
            >
              <Grid item>
                <Divider>o</Divider>
                <ButtonCustom onClick={googleLogin}>
                  Acceder con Google 🚀
                </ButtonCustom>
              </Grid>
              <Grid item>
                <Typography>¿No tienes cuenta?</Typography>
                <Link href={RouteKeys.SIGNUP} variant="body2">
                  Registrate aquí
                </Link>
              </Grid>
            </Grid>
          </Box>
        </AuthLayout>
      )}
    </>
  );
};

export default SignIn;
