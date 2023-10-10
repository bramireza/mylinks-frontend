import { SvgGithub, SvgInstagram, SvgLinkedin, SvgTwitter } from "@/utils";
import styles from './styles.module.css';
const Footer = () => {
  return (
    <section>
      <div className={styles.containerFooter}>
        <a
          href="https://twitter.com/bramirezag"
          target="_blank"
          aria-label="Twitter"
          className={styles.item}
        >
          <SvgTwitter />
        </a>
        <a
          href="https://github.com/bramireza"
          target="_blank"
          aria-label="Github"
          className={styles.item}
        >
          <SvgGithub />
        </a>
        <a
          href="https://instagram.com/brayian.17ra"
          target="_blank"
          aria-label="Instagram"
          className={styles.item}
        >
          <SvgInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/brayian-ramirez-aguayo"
          target="_blank"
          aria-label="LinkedIn"
          className={styles.item}
        >
          <SvgLinkedin />
        </a>
      </div>
    </section>
  );
};

export default Footer;
