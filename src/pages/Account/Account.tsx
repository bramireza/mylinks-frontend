import { useAppDispatch, useField, useUser } from "@/hooks";
import { setUser } from "@/redux/slices";
import { handleError } from "@/utils";
import { user as userApi } from "@/api";
import { BaseLayout } from "@/layouts";
import { AvatarField, Button, Card, Divider, TextField } from "@/components";
import styles from "./styles.module.css";

const Account = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const username = useField<string>({ initialValue: user.username });
  const avatar = useField<string>({
    initialValue: user.avatar.secure_url,
    type: "file",
  });
  const email = useField<string>({ initialValue: user.email });
  const firstName = useField<string>({ initialValue: user.firstName });
  const lastName = useField<string>({ initialValue: user.lastName });
  const birthDay = useField<Date>({ type: "date", initialValue: user.birthDay});
  const gender = useField<string>({ initialValue: user.gender });
  const nationality = useField<string>({ initialValue: user.nationality });
  const password = useField<string>({ type: "password" });
  const repeatPassword = useField<string>({ type: "password" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      avatar.file && formData.append("avatar", avatar.file);
      email.value && formData.append("email", email.value);
      firstName.value && formData.append("firstName", firstName.value);
      lastName.value && formData.append("lastName", lastName.value);
      birthDay.value && formData.append("birthDay", birthDay.value.toString());
      username.value && formData.append("username", username.value);
      gender.value && formData.append("gender", gender.value);
      nationality.value && formData.append("nationality", nationality.value);
      password.value && formData.append("password", password.value);

      const result = await userApi.updateUserProfile(user._id, formData);
      if (result.success) {
        dispatch(setUser(result.user));
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleReset = () => {
    firstName.reset();
    lastName.reset();
    gender.reset();
    nationality.reset();
    birthDay.reset();
    username.reset();
    email.reset();
    password.reset();
    repeatPassword.reset();
  };
  return (
    <BaseLayout>
      <div className={styles.containerLayout}>
        <Card className={styles.cardProfile}>
          <div className={styles.title}>
            <h1>{user.fullName}</h1>
            <strong className="b1">{`@${user.username}`}</strong>
          </div>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <AvatarField name="avatar" {...avatar} />
            <Button type="submit">Actualizar Foto</Button>
            <div className={styles.containerNote}>
              <p className="b2">
                Sube una nueva foto de perfil. Las imagenes grandes se cambiaran
                de tamaño automaticamente.
                <br /> <br />
                El tamaño máximo de subida es <strong>1MB</strong>
              </p>
            </div>
          </form>
        </Card>
        <Card className={styles.cardEdit}>
          <div className={styles.title}>
            <h2 className="text-md">Configuración de Cuenta</h2>
            <Divider>{user.firstName}</Divider>
          </div>
          <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form} noValidate>
            <div className={styles.containerForm}>
              <div className={styles.subtitle}>
                <h3>Datos Personales</h3>
              </div>
              <div className={styles.containerFullWidth}>
                <TextField name="firstName" label="Nombres" {...firstName} />
                <TextField
                  name="lastName"
                  label="Apellidos"
                  {...lastName}
                />
              </div>
              <div className={styles.containerFullWidth}>
                <TextField name="gender" label="Género" {...gender} />
                <TextField
                  name="nationality"
                  label="Nacionalidad"
                  {...nationality}
                />
              </div>
              <div className={styles.containerFullWidth}>
                <TextField
                  name="birthDay"
                  label="Fecha Nacimiento"
                  {...birthDay}
                />
              </div>
              <div className={styles.containerButton}>
                <Button type="reset">Cancelar</Button>
                <Button type="submit">Actualizar</Button>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form} noValidate>
            <div className={styles.containerForm}>
              <div className={styles.subtitle}>
                <h3>Datos de Seguridad</h3>
              </div>
              <div className={styles.containerFullWidth}>
                <TextField
                  name="username"
                  label="Nombre de Usuario"
                  {...username}
                  disabled
                />
                <TextField name="email" label="Email" {...email} disabled />
              </div>
              <div className={styles.containerFullWidth}>
                <TextField
                  name="password"
                  label="Contraseña"
                  {...password}
                  disabled
                />
                <TextField
                  name="repeatPassword"
                  label="Repita su contraseña"
                  {...repeatPassword}
                  disabled
                />
              </div>
              <div className={styles.containerButton}>
                <Button type="reset">Cancelar</Button>
                <Button type="submit">Actualizar</Button>
              </div>
              </div>
          </form>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Account;
