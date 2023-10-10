import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.containerLoader}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loading;
