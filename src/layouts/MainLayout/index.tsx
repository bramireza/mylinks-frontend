import React from "react";
import { useAppSelector } from "@/hooks";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.settings);
  const isLight = themeMode === "light";
  return (
    <div className={styles.layout}>
      <div className={styles.containerLayout}>{children}</div>
    </div>
  );
};

export default MainLayout;
