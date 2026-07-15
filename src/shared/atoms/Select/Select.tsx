import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SelectHTMLAttributes,
} from "react";
import styles from "./Select.module.css";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

type FormFieldCompatibleSelect = ForwardRefExoticComponent<
  SelectProps & RefAttributes<HTMLSelectElement>
> & {
  supportsFormFieldControl?: boolean;
};

const SelectBase = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    const classes = [styles.select, className ?? ""].filter(Boolean).join(" ");

    return <select ref={ref} className={classes} {...props} />;
  },
) as FormFieldCompatibleSelect;

SelectBase.displayName = "Select";
SelectBase.supportsFormFieldControl = true;

export const Select = SelectBase;
