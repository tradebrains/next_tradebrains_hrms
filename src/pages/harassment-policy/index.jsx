import React from "react";
import styles from "./harassment.module.css";

function index() {
  return (
    <div>
      <h2 className={styles.header_text}>Sexual Harassment policies</h2>
      <div>
        <a
          className={styles.link}
          href="https://fingrad-test.s3.ap-south-1.amazonaws.com/hrms-pdf/Sexual+Harassment+Policy+at+Trade+Brains.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="pdf.file"
            src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
            style={{ width: "40px", height: "40px", borderRadius: ".5rem" }}
          />
          <span style={{ marginLeft: "10px" }}>
            Sexual Harassment policies.pdf
          </span>
        </a>
      </div>
    </div>
  );
}

export default index;
