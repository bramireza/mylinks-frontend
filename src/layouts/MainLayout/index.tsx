import React from "react";
import { useAppSelector } from "@/hooks";
import BaseLayout from "../BaseLayout";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.settings);
  const isLight = themeMode === "light";
  return (
    <BaseLayout>
      <div className={styles.containerLayout}>{children}</div>
    </BaseLayout>
  );
};

export default MainLayout;
