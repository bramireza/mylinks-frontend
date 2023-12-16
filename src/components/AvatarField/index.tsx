import { FC, useRef } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { Image } from "@/components";
import { SvgPhotoEdit } from "@/utils";

interface Props {
  name: string;
  value: string;
  isError?: boolean;
  nameError?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarField: FC<Props> = ({
  name,
  value,
  isError = false,
  nameError,
  disabled = false,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current!.click();
  };
  return (
    <div className={clsx(styles.container, { [styles.disabled]: disabled })}>
      <div className={styles.imageField}>
        <input type="file" multiple className={styles.input} ref={inputRef} name={name} onChange={onChange}/>
        <Image
          className={styles.image}
          src={value}
          alt="Foto de Perfil"
          onClick={onClick}
          rounded
        />
        <label className={styles.label}>
          <SvgPhotoEdit />
        </label>
      </div>
      {isError && <label className={styles.labelError}>{nameError}</label>}
    </div>
  );
};

export default AvatarField;
