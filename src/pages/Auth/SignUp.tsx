import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Divider,
  InputAdornment,
} from "@mui/material";
import { AuthLayout } from "../../layouts";
import { authServices } from "../../services";
import { ButtonCustom } from "../../components";
import { handleError } from "../../utils";
import { keysConfig } from "../../configs";
import { useGoogleLoginConfig } from "../../hooks";

const { RouteKeys } = keysConfig;

const SignUp = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();
  const googleLogin = useGoogleLoginConfig();
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
      const { success } = await authServices.signUp(dataForm);
      if (success) navigate(`/${RouteKeys.LOGIN}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };
  return (
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" sx={{ mt: 5 }} onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", textAlign: "center" }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nombres"
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={handleChange}
                value={dataForm.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Apellidos"
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                onChange={handleChange}
                value={dataForm.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                id="username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={dataForm.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {`${window.location.host}/`}
                    </InputAdornment>
                  ),
                }}
                variant="filled"
              />
            </Grid>
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
              <ButtonCustom>Registrar</ButtonCustom>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ justifyContent: "center", textAlign: "center" }}>
          <Grid item>
            <Divider>o</Divider>
            <ButtonCustom onClick={googleLogin}>
              Acceder con Google 🚀
            </ButtonCustom>
          </Grid>
          <Grid item>
            <Typography>¿Ya tienes cuenta?</Typography>
            <Link href={RouteKeys.LOGIN} variant="body2">
              Inicia Sesión aquí
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
