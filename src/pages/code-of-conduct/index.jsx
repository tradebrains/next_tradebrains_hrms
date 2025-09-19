import React from "react";
import styles from "./code.module.css";

function index() {
  return (
    <div>
      {" "}
      <h2 className={styles.header_text}>Code Of Conduct</h2>
      <div>
        <a
          className={styles.link}
          href="https://fingrad-test.s3.ap-south-1.amazonaws.com/hrms-pdf/Code+of+Conduct_Trade+Brains.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="pdf.file"
            src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
            style={{ width: "40px", height: "40px", borderRadius: ".5rem" }}
          />
          <span style={{ marginLeft: "10px" }}>Code Of Conduct.pdf</span>
        </a>
      </div>
    </div>
  );
}

export default index;
