import React from "react";
import styles from "./Loader.module.css";
import Image from "next/image";
import gif from "../../assets/images/rocket.gif";

function DotLoader() {
  return (
    <div className={styles.container}>
      {/* <div class={styles.loader}></div> */}
      <div>
        <Image src={gif} height={200} width={200} />
      </div>
    </div>
  );
}

export default DotLoader;
