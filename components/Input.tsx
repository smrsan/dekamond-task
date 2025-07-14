import styles from "./styles/Input.module.scss";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={styles.input} {...props} />;
}
