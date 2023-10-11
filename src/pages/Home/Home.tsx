import { keysConfig } from "../../configs";
import { MainLayout } from "../../layouts";
import { Divider, Footer, Link } from "@/components";
const { RouteKeys } = keysConfig;
import styles from "./styles.module.css";

const Home = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>LINK YOU</h1>
          <h2>Inicia ahora y comparte tus redes</h2>
        </div>
        <Link href={`/${RouteKeys.LOGIN}`} fullWidth>Iniciar Sesión</Link>
        <Divider>O</Divider>
        <Link href={`/${RouteKeys.SIGNUP}`} fullWidth>Registrar</Link>
        <Footer/>
      </div>
    </MainLayout>
  );
};

export default Home;
