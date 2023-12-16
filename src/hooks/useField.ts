import { useState, ChangeEvent } from "react";

interface Props<T> {
  type?: "text" | "number" | "password" | "file" | "date";
  initialValue?: T;
}

const useField = <T>({ type = "text", initialValue }: Props<T>) => {
  if (!initialValue)
    initialValue = (
      type === "number" ? 0 : type === "date" ? new Date() : ""
    ) as T;

  const [value, setValue] = useState<T>(initialValue);
  const [file, setFile] = useState<File>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value as T);
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const result = e.target.result as T;
          setValue(result);
        }
      };
      setFile(file);
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setValue(initialValue as T);
  }

  return {
    type,
    value,
    file,
    onChange: type === "file" ? onFileChange : onChange,
    reset
  };
};

export default useField;
