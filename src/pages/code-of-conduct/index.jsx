import React, { useState } from "react";
import styles from "./code.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";

function index() {
  const [modal, setModal] = useState(false);
  return (
    <div>
      {" "}
      <h2 className={styles.header_text}>Code Of Conduct</h2>
      <div>
        {/* <a
          className={styles.link}
          href="https://fingrad-test.s3.ap-south-1.amazonaws.com/hrms-pdf/Code+of+Conduct_Trade+Brains.pdf"
          target="_blank"
          rel="noreferrer"
        > */}
        <img
          alt="pdf.file"
          src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
          style={{ width: "40px", height: "40px", borderRadius: ".5rem" }}
        />
        <div style={{ marginLeft: "10px" }} onClick={() => setModal(true)}>
          Code Of Conduct.pdf
        </div>
        {/* </a> */}
      </div>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        closable
        centered
        width={600}
        closeIcon={<CloseOutlined className={`${"text-white"}`} />}
        className={`custom-kyc-terms-modal ${"kycmodal-close-dark"}`}
      >
        <div className={styles.terms_container}>
          <iframe
            src={`https://fingrad-test.s3.ap-south-1.amazonaws.com/hrms-pdf/Code+of+Conduct_Trade+Brains.pdf`}
            title="PDF Document"
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default index;
