import { cloneElement, isValidElement, useId, type ReactNode } from "react";
import styles from "./FormField.module.css";

export type FormFieldProps = {
  label: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  className?: string;
};

type ControlA11yProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type FormFieldCompatibleComponent = {
  supportsFormFieldControl?: boolean;
};

const NATIVE_FORM_CONTROLS = new Set(["input", "textarea", "select"]);

export function FormField({
  label,
  children,
  error,
  hint,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const hasError = Boolean(error);

  const isNativeControl =
    isValidElement<ControlA11yProps>(children) &&
    typeof children.type === "string" &&
    NATIVE_FORM_CONTROLS.has(children.type);

  const isFormFieldCompatibleComponent =
    isValidElement<ControlA11yProps>(children) &&
    typeof children.type !== "string" &&
    Boolean(
      (children.type as FormFieldCompatibleComponent).supportsFormFieldControl,
    );

  const canBindLabelToControl =
    isNativeControl || isFormFieldCompatibleComponent;
  const canInjectA11yProps = isNativeControl || isFormFieldCompatibleComponent;

  const controlId = canBindLabelToControl
    ? (children.props.id ?? generatedId)
    : undefined;
  const hintId = `${generatedId}-hint`;
  const errorId = `${generatedId}-error`;

  const classes = [
    styles.formField,
    hasError ? styles.formFieldError : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy =
    [hint ? hintId : "", hasError ? errorId : ""].filter(Boolean).join(" ") ||
    undefined;

  const control =
    canInjectA11yProps && controlId
      ? cloneElement(children, {
          id: controlId,
          "aria-describedby": describedBy,
          "aria-invalid": hasError || undefined,
        })
      : children;

  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={controlId}>
        {label}
      </label>
      <div className={styles.control}>{control}</div>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {hasError ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
