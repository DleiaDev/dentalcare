import Image from "next/image";
import LogoSvg from "@/icons/logo.svg";
import styles from "./Logo.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      {/* <Image className={styles.icon} src={LogoSvg} alt="Logo" /> */}
      <LogoSvg />
      <h1 className={styles.name}>Dentalcare</h1>
    </div>
  );
}
