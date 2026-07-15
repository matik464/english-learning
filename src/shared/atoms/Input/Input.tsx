import type { InputHTMLAttributes, ReactElement } from "react";
import styles from "./Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

type FormFieldCompatibleInput = ((props: InputProps) => ReactElement) & {
  supportsFormFieldControl?: boolean;
};

const InputBase: FormFieldCompatibleInput = ({
  className,
  type = "text",
  ...props
}: InputProps) => {
  const classes = [styles.input, className ?? ""].filter(Boolean).join(" ");

  return <input className={classes} type={type} {...props} />;
};

InputBase.supportsFormFieldControl = true;

export const Input = InputBase;
