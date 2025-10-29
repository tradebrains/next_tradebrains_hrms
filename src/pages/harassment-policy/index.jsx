import React, { useState } from "react";
import styles from "./harassment.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";

function index() {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <h2 className={styles.header_text}>Sexual Harassment policies</h2>
      <div className={styles.flex_text_image}>
        <img
          alt="pdf.file"
          src="https://firebasestorage.googleapis.com/v0/b/hrms-tradebrains.appspot.com/o/assets%2FattachmentPdf.png?alt=media&token=ba18543b-f1c4-40b5-8a3b-369af165df04"
          style={{ width: "40px", height: "40px", borderRadius: ".5rem" }}
        />
        <div className={styles.text} onClick={() => setModal(true)}>
          Sexual Harassment policies.pdf
        </div>
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
            src={`https://tradebrains-fingrad-staging.s3.ap-south-1.amazonaws.com/Policies/Sexual%2BHarassment%2BPolicy%2Bat%2BTrade%2BBrains.pdf`}
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

export async function getServerSideProps(context) {
  const { req, query } = context;

  if (!req?.cookies?.hrms_access_token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
