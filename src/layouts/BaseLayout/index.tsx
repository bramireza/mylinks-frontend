import React from "react";
import { useAppSelector } from "@/hooks";
import styles from "./styles.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.settings);
  const isLight = themeMode === "light";
  return <div className={styles.layout}>{children}</div>;
};

export default BaseLayout;
