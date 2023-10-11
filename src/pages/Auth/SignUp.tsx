import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "@/services";
import { SvgSignup, handleError } from "@/utils";
import { keysConfig } from "@/configs";
import { useGoogleLoginConfig } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Box, Button, Divider, TextField } from "@/components";
import styles from "./styles.module.css";

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
    <MainLayout>
      <Box>
        <div className={styles.containerBox}>
          <div className={styles.containerHeader}>
            <SvgSignup />
            <h1>Registro</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <TextField
                type="text"
                label="Username"
                name="username"
                onChange={handleChange}
                value={dataForm.username}
              />
              <TextField
                type="text"
                label="Nombres"
                name="firstName"
                onChange={handleChange}
                value={dataForm.firstName}
              />
              <TextField
                type="text"
                label="Apellidos"
                name="lastName"
                onChange={handleChange}
                value={dataForm.lastName}
              />
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
              <Button type="submit" style={{ marginTop: "24px" }} fullWidth>
                Registrar
              </Button>
            </div>
          </form>
          <div className={styles.containerButton}>
            <Divider>O</Divider>
            <Button onClick={googleLogin} fullWidth>
              Acceder con Google 🚀
            </Button>

            <span className="b1">
              ¿Ya tienes cuenta? <br />
              <a href={RouteKeys.LOGIN}>
                <span className="b2">Inicia Sesión aquí</span>
              </a>
            </span>
          </div>
        </div>
      </Box>
    </MainLayout>
  );
};

export default SignUp;
