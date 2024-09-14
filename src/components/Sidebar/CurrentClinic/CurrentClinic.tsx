import HospitalIcon from "@/icons/hospital.svg";
import styles from "./CurrentClinic.module.scss";
import Image from "next/image";
import cn from "classnames";

type Props = {
  className?: string;
};

export default function CurrentClinic({ className }: Props) {
  return (
    <div className={cn([styles["current-clinic"], className])}>
      <HospitalIcon />
      {/* <Image src={HospitalIcon} alt="Clinic" /> */}
      <div className={styles["current-clinic__text-container"]}>
        <h5 className={styles["current-clinic__title"]}>Avicena Clinic</h5>
        <p className={styles["current-clinic__address"]}>
          845 Euclid Avenue, CA
        </p>
      </div>
    </div>
  );
}
