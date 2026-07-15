import styles from "./PendingBlock.module.css";

type PendingOpacityProps = {
  children: React.ReactNode;
  isPending: boolean;
};

const PendingOpacity = ({ children, isPending }: PendingOpacityProps) => {
  const classes = [styles.root, isPending ? styles.pending : ""]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

export default PendingOpacity;
