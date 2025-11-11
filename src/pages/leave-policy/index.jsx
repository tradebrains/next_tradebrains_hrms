import React from "react";
import styles from "./leave.module.css";

function index() {
  return (
    <div>
      <h2 className={styles.header}>Types of Leaves at Trade Brains</h2>
      <h3 className={styles.title}>1. Sick Leave</h3>
      <ul className={styles.list}>
        <li>Sick leave is paid leave.</li>
        <li>
          Permanent Employees are entitled to receive 1 sick leave per month,
          credited on a monthly basis (at the start of the month).
        </li>
        <li>
          The sick leave grant will start only once confirmed as a permanent
          employee.
        </li>
        <li>
          An employee can avail a maximum of 12 days of sick leave in a year.
        </li>
        <li>Sick leave cannot be carried forward to next year.</li>
        <li>
          A medical report is to be submitted in case of taking sick leave for
          more than 2 days.
        </li>
      </ul>
      <h4 className={styles.list}>Note:Process to Apply for Sick Leaves:</h4>
      <p className={styles.note}>
        Sick leave can be applied for by an employee on the HRMS tool. For
        approval, they must send an email to their reporting manager specifying
        the reason and date for the sick leave and obtain approval. Once
        approved, they can proceed to apply on the HRMS portal. Leaves are
        deducted from the leave balance from the employee's account, and the
        latest balance is updated on the HRMS tool.{" "}
      </p>
      <h3 className={styles.title}>2. Privilege Leave</h3>
      <ul className={styles.list}>
        <li>Privilege leave is paid leave.</li>
        <li>
          Permanent Employees are entitled to receive 1 Privilege leave per
          month, credited on a monthly basis (at the start of the month)
        </li>
        <li>
          An employee can avail a maximum of 12 days of Privilege leave in a
          year.
        </li>
        <li>
          The Privilege leave grant will start only once confirmed as a
          permanent employee.
        </li>
        <li>
          Privilege leave can be encashed and carried forward to the next year
        </li>
        <li>
          Privilege leave should be applied one day in advance and a week in
          advance when it is applied for more than 2 days.
        </li>
        <li>
          For personal travel or vacation, employees must apply for Privilege
          Leave (PL). Sick Leave (SL) should not be used for such purposes and
          may only be availed once all PL has been exhausted.
        </li>
      </ul>
      <h4 className={styles.list}>
        Note: Process to apply for Privilege Leaves:
      </h4>
      <p className={styles.note}>
        Privilege leave can be applied for by an employee on the HRMS tool. For
        approval, before applying, they must send an email to their reporting
        manager specifying the reason and dates for the planned leave and obtain
        prior approval. Once approved, they can proceed to apply on the HRMS
        portal. Leaves are deducted from the leave balance from the employee's
        account, and the latest balance is updated on the HRMS tool.
      </p>
      <h3 className={styles.title}>3. Loss of Pay / Leave Without Pay (LOP)</h3>
      <p className={styles.h5}>
        An employee may avail Leave Without Pay (LOP) in case their existing
        leave balance is exhausted and they require leave due to unforeseen
        circumstances.
      </p>
      <ul className={styles.list}>
        <li>
          Eligibility :  Only permanent employees are eligible to avail leave
          benefits. Employees on probation are not entitled to any form of paid
          leave.
        </li>
        <li>
          Maximum Limit :  A maximum of 10 days of Leave Without Pay may be
          availed by an employee during a calendar year.
        </li>

        <li>
          Approval Process :  The employee must apply for LOP on the HRMS tool.
          The application must be approved by both the immediate reporting
          manager and the Head of Department (HOD). Once approved, the leave
          will be updated as Loss of Pay in the HRMS tool.
        </li>
        <li>
          Emergency Situations :  In case of an emergency where leave cannot be
          applied in advance, the employee must inform the immediate reporting
          manager via email or telephone at the earliest possible time.
        </li>
        <li>
          Unauthorised Absence :  Absence from work without prior approval will be
          treated as Leave of Absence (unauthorised absence) and will attract
          disciplinary action.
        </li>

        <p>No salary will be paid for such unapproved or LOP days.</p>
      </ul>
      <h3 className={styles.title}>4. Compensatory off</h3>
      <ul className={styles.list}>
        <li>
          An employee is eligible for a compensatory off if they have worked on
          an important assignment due to business or project requirements on a
          national holiday, festival, or any declared off day.
        </li>
        <li>
          Prior approval from senior management is mandatory before working on
          such days.
        </li>
        <li>
          The compensatory off must be utilised within 1 (one) month from the
          date earned; otherwise, it will lapse.
        </li>
        <li>
          Special cases or exceptions will only be reviewed and approved by
          senior management.
        </li>
      </ul>
      <h4 className={styles.list}>Note: Process to avail compensatory loss:</h4>
      <p className={styles.note}>
        Approval from senior management is mandatory for availing compensatory
        off. Employees who have worked on national holidays, festivals, or
        declared off days are eligible to take a compensatory day off instead of
        the work done on those days.
      </p>
      <p className={styles.note_2}>
        When availing a compensatory off, the employee must inform their
        immediate reporting manager in advance. Managers or admins must add
        eligible comp-offs in the Add Comp-Off section of the HRMS portal. Once
        added, employees can apply for the compensatory off, which must then be
        approved by their reporting manager.
      </p>

      <h3 className={styles.title}>5. Maternity Leave</h3>
      <ul className={styles.list}>
        <li>
          All confirmed female employees shall be entitled to Maternity leave as
          per Maternity Benefit Act 2016, with full pay for a period of
          continuous 26 weeks for each pregnancy up to a maximum of 2
          confinements.
        </li>
        <li>
          Leave taken for prenatal treatment for the first 7 months of pregnancy
          will be considered as normal leave, not maternity leave.
        </li>
        <li>
          A woman employee can take maternity leave earliest 8 weeks before the
          expected date of delivery.
        </li>
      </ul>
      <p className={styles.h5}>Process of Maternity Leave</p>
      <ul className={styles.list}>
        Before proceeding on Maternity Leave it is needed to be applied on HRMS
        tool and must be approved by the reporting manager. The woman employee
        proceeding on Maternity leave must also submit a doctor's certificate to
        HR.
      </ul>
      <h3 className={styles.title}>6. Wedding Leave Policy</h3>
      <p className={styles.h5}>
        Our wedding Leave policy provides employees with adequate leave to
        attend weddings of their immediate family or close relations while
        ensuring minimal disruption to business operations.
      </p>
      <h5 className={styles.h5}>Types of Wedding Leave:</h5>
      <ul className={styles.list}>
        <table className={styles.table}>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th style={{ fontWeight: "bold" }}>Relation</th>
            <th style={{ fontWeight: "bold" }}>Maximum Leave Allowed</th>
          </tr>
          <tr>
            <td>Self</td>
            <td>10 calendar days</td>
          </tr>
          <tr>
            <td>Immediate Family (Kin)*</td>
            <td>7 calendar days</td>
          </tr>
          <tr>
            <td>Extended Family/Close Friends**</td>
            <td>Up to 2 calendar days</td>
          </tr>
        </table>
      </ul>
      <h4 className={styles.list}>
        Note: Immediate Family includes spouse, siblings, parents, and children.{" "}
      </h4>
      <h4>
        <ul className={styles.list}>
          <li>Subject to the manager’s approval and work exigency.</li>
          <li>Leave should be applied at least 7 days in advance.</li>
          <li>
            Documentary proof (e.g., wedding card or invitation) may be
            requested for extended leave.{" "}
          </li>

          <li>
            The Wedding leaves should only apply under Privilege Leave for the
            employees.
          </li>
          <li>
            Any leave beyond the mentioned limits will be treated as unpaid
            leave (Leave without Pay), subject to approval.
          </li>
          <li>
            Department heads or reporting managers may approve exceptions based
            on criticality, work schedule, or humanitarian grounds, but must
            record such exceptions with HR.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>7. Maximum Leave Duration Policy</h3>
      <h4 className={styles.h5}>
        To ensure continuity of work and maintain productivity, the following
        guideline applies to all planned leaves (excluding health-related or
        medical emergencies):
      </h4>
      <h4>
        <ul className={styles.list}>
          <li>
            A maximum of 10 consecutive calendar days (including Saturdays and
            Sundays) of leave is allowed for any employee at a time. This rule
            applies to all types of personal leave, such as vacation, weddings,
            family functions, etc. Medical or health-related leaves are excluded
            from this policy.
          </li>
          <li>
            Any request for leave exceeding 10 days will require special
            approval from the CEO or Directors, and must be justified with
            sufficient reason.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>Other Leave Policies</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            If an employee is absent continuously for 7 days beyond sanctioned
            leave with no information, in this case, the employee shall be
            considered to have absconded from work on his/her free will.
          </li>
          <li>HR will take action in this case.</li>
          <li>
            First Warning letter will be issued to the employee if he/she does
            not return within 7 days of expiry of sanctioned leave. If no
            response from an employee within 3 days of the issuance of 1st
            warning letter, 2nd warning letter will be issued. If there is still
            no response from the said employee, the final termination letter
            will be issued in 3 days after issuance of the 2nd warning letter.
          </li>
          <li>
            In case of prolonged illness or leave of absence from work, an
            employee is supposed to inform the immediate reporting manager at
            regular intervals about their condition and the most probable date
            of return.
          </li>
          <li>
            In the absence of any communication from employees, serious action
            can be taken by the company. Weekends and any holiday lying between
            the sanctioned leave periods will be excluded and not be counted as
            leave in case of casual and medical leave.{" "}
          </li>
          <li>
            In case of planned leave, it is the employee’s responsibility to
            apply for leave in advance; however, in case of unplanned leave,
            employees must regularise leave within 2 days of resuming duty.{" "}
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>Cancellation of leave</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Approved leave can be cancelled depending on the circumstances.
          </li>
          <li>Leave balance will be updated accordingly on the HRMS tool.</li>
        </ul>
      </h4>
      <h3 className={styles.title}>Extension of leave</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            In case of extension of leave due to any unforeseen circumstances,
            the employee must inform the reporting manager in advance.
          </li>
          <li>
            The extended leave must be applied on the HRMS tool in case of
            planned extension so that both the reporting manager and HR are
            informed automatically.
          </li>
          <li>
            This is the case when a leave extension has been verbally or over
            the phone. It is the employee's responsibility to regularise leave
            on the HRMS tool once an employee has resumed back on duty.{" "}
          </li>
          <li>
            The extended leave must be applied on the HRMS tool in case of a
            planned extension, so that both the reporting manager and HR are
            informed automatically.
          </li>
          <li>
            The leave balance is automatically updated in the HRMS tool. In case
            the employee overstays without approval, it will be treated as
            absence from duty, and disciplinary action will be taken against the
            employee. Leave extended without permission will be treated as a
            loss of pay
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>
        Leave calculation on resignation/termination
      </h3>
      <h4 className={styles.h5}>
        In case an employee has resigned from the services or on termination of
        the employee, all the pending Privilege leaves will be encashed with the
        full & final settlement.
      </h4>
      <h3 className={styles.title}>Revision of the policy</h3>
      <h4 className={styles.h5}>
        The company reserves the right to review, modify, or withdraw this
        policy at any time based on operational or statutory requirements.
      </h4>
    </div>
  );
}

export default index;
