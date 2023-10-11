import { useNavigate } from "react-router-dom";
import { authServices } from "@/services";
import { SvgSignup, handleError } from "@/utils";
import { keysConfig } from "@/configs";
import { useField, useGoogleLoginConfig } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Card, Button, Divider, TextField } from "@/components";
import styles from "./styles.module.css";

const { RouteKeys } = keysConfig;

const SignUp = () => {
  const username = useField({ type: "text" });
  const firstName = useField({ type: "text" });
  const lastName = useField({ type: "text" });
  const email = useField({ type: "text" });
  const password = useField({ type: "password" });
  const navigate = useNavigate();
  const googleLogin = useGoogleLoginConfig();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataForm = {
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      }
      const { success } = await authServices.signUp(dataForm);
      if (success) navigate(`/${RouteKeys.LOGIN}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <MainLayout>
      <Card>
        <div className={styles.containerCard}>
          <div className={styles.containerHeader}>
            <SvgSignup />
            <h1>Registro</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <TextField label="Username" name="username" {...username} />
              <TextField label="Nombres" name="firstName" {...firstName} />
              <TextField label="Apellidos" name="lastName" {...lastName} />
              <TextField label="Email" name="email" {...email} />
              <TextField label="Contraseña" name="password" {...password} />
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
      </Card>
    </MainLayout>
  );
};

export default SignUp;
