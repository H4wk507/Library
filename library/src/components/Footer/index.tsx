import githubLogo from "../../assets/github.png";
import styles from "./style.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img
        src={githubLogo}
        className={styles["github-logo"]}
        alt="github-logo"
      />
      <a
        href="https://www.github.com/H4wk507/library"
        target="_blank"
        className={styles["github-link"]}
      >
        GitHub
      </a>
    </footer>
  );
}
