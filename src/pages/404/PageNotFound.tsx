import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Link } from "@/components";
import styles from "./styles.module.css";

const PageNotFound = () => {
  const [number, setNumber] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt < 10) {
      setTimeout(() => {
        setNumber((prev) => prev + generateRandomNumber());
      }, 100);
    } else {
      setNumber(404);
    }
  }, [attempt]);
  
  const generateRandomNumber = () => {
    setAttempt(attempt + 1);
    return Math.floor(Math.random() * 100) + 1;
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h2 className="text-lg">{`${number}`}</h2>
        <h1 className="text-md">¡Página no Encontrada!</h1>
        <span className={"b1 text-sm"}>
          Lo sentimos, <br /> no pudimos encontrar esta página
        </span>
        <Link className="text-xs" href={"/"}>Ir al Home</Link>
      </div>
    </MainLayout>
  );
};

export default PageNotFound;
