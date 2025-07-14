import styles from "./styles/Button.module.scss";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={styles.button} {...props} />;
}
