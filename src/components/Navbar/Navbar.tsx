import IconMenu from "@/assets/icons/more-vert.svg?react";
import styles from "./Navbar.module.scss";

type NavbarProps = {
  title?: string;
};

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle}>Process {title}</span>
      <button className={styles.navbarIcon} aria-label="Stepper Menu">
        <IconMenu />
      </button>
    </div>
  );
};
