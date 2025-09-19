import React from "react";
import styles from "./notice.module.css";

function index() {
  return (
    <div>
      <h2>Notice Period</h2>
      <p className={styles.title}>
        All the full-time time and part-time employees of the company have to
        abide by the following Notice Period Policy:
      </p>
      <ol className={styles.list}>
        <li>
          The employee has to mention the resignation date in writing in their
          resignation letter.
        </li>
        <li>
          Managers and HR should be in CC in the resignation letter email sent
          to the company.
        </li>
        <li>
          The Notice Period starts once the resignation is formally accepted by
          the employee and the manager in writing. Verbal confirmation will not
          be accepted.
        </li>
        <li>
          The notice period will be 60 days for full-time employees and 30 days
          for the employees on probation from the day the resignation is
          accepted.{" "}
        </li>
        <li>
          Employees will 'NOT' be eligible to use any Paid Leaves during the
          notice period.
        </li>
        <p>
          A full-time employee who is on notice period will only be paid for the
          notice period duration i.e 60 days. Similarly, incase of Probationers,
          the payment will be for 30 days.
          <br></br>
          In case an employee takes leave during the notice period, their notice
          period duration will be extended by the number of days of leaves
          taken.Thus the payment for those extended days are not applicable.
          <br></br>
          Employee buyout option during notice period totally depends on the
          Employer.
          <br></br>
          Incase of any indisciplinary action, the management’s decision will be
          final.
          <br></br>
        </p>
        <li>
          All the final settlements of the salary payment and other company
          expenses like medical policy etc will be settled on the last day of
          the work.
        </li>
      </ol>
      <p className={styles.h5}>
        Revision of the policy<br></br>
        The company reserves the right to revise or modify any or all clauses of
        this policy depending upon the demand of the business. (Last Updated on
        1st August 2023)
      </p>
    </div>
  );
}

export default index;
