import React from "react";
import styles from "./leave.module.css";

function index() {
  return (
    <div>
      <p className={styles.header_text}>
        The Permanent Employees at Trade Brains are entitled to receive leave
        benefits during their employment tenure. The employees at Trade Brains
        will be following these leave policy:
      </p>
      <h2 className={styles.header}>Basic Leave Policy Guidelines</h2>
      <ul className={styles.list}>
        <li>
          All leave records of the employees shall be maintained in this HRMS
          tools.
        </li>
        <li>
          Only permanent employees are entitled to receive the leaves. There is
          no leave granted to the employees during the probationary period.
        </li>
        <li>
          Leave cannot be claimed as a matter of right. Any kind of leave can be
          granted or refused depending upon the business demands. Leave of
          absence from work without proper approval will call for disciplinary
          action.
        </li>
        <li>
          An employee shall not proceed on leave until unless leave has been
          approved by the reporting manager.
        </li>
        <li>Leave without approval will be considered as leave without pay.</li>
        <li>
          All leaves should be applied on the HRMS tool before proceeding on
          leave.
        </li>
        <li>
          In case of emergency when leave cannot be applied in advance, email
          and telephonic intimation to the immediate reporting manager should be
          done.
        </li>
      </ul>
      <h2 className={styles.header}>Types of Leaves at Trade Brains</h2>
      <h3 className={styles.title}>1. Sick Leave</h3>
      <ul className={styles.list}>
        <li>Sick leave is paid leave.</li>
        <li>
          Permanent Employees are entitled to receive 1 sick leave per month,
          credited on the monthly basis (at the end of the month).
        </li>
        <li>
          The sick leaves grant will start only once confirmed as a permanent
          employee.
        </li>
        <li>
          Maximum 12 days of sick leave can be availed by an employee in a year.
        </li>
        <li>Sick leave cannot be carried forward to next year.</li>
        <li>
          Medical report is to be submitted in case of taking sick leave of more
          than 2 days. Process to Apply for Sick Leaves: Sick leave can be
          applied by an employee on HRMS tool. For approval the leave
          notification will reach the reporting manager. Once approved, approval
          notification will reach to employee and HR. Leave are deducted from
          leave balance from the employees account and latest balance updated on
          HRMS tool.
        </li>
      </ul>
      <h3 className={styles.title}>2. Casual Leave</h3>
      <ul className={styles.list}>
        <li>Casual leave is paid leave.</li>
        <li>
          Permanent Employees are entitled to receive 1 casual leave per month,
          credited on the monthly basis (at the end of the month)
        </li>
        <li>
          Maximum 12 days of casual leave can be availed by an employee in a
          year.
        </li>
        <li>
          The casual leaves grant will start only once confirmed as a permanent
          employee.
        </li>
        <li>Casual leave can be carried forward to next year.</li>
        <li>
          Casual leave should be applied one day in advance and a week in
          advance when it is applied for more than 2 days.
        </li>
        <li>
          Maximum of 5 casual leaves can be applied at once, unless in
          extraordinary circumstances. Process to Apply for Casual Leaves:
          Casual leave can be applied by an employee on HRMS tool. For approval
          the leave notification will reach the reporting manager. Once
          approved, approval notification will reach employees and HR. Leave are
          deducted from leave balance from the employees account and latest
          balance updated on HRMS tool.
        </li>
      </ul>
      <h3 className={styles.title}>3. Loss of Pay/Leave without Pay</h3>
      <ul className={styles.list}>
        <li>
          An employee can avail leave without pay in case the existing leave
          balance is exhausted and the employee is in need of leave due to
          unforeseen circumstances.
        </li>
        <li>
          In case no approval is taken for leave without pay, such absence of an
          employee will be considered as Leave of absence from work.
          Disciplinary action will be taken in case of absence without approval.
        </li>
        <li>
          No salary would be given to employees for the days leave without pay
          is availed.
        </li>
        <li>
          A maximum of 10 days of leave without pay is allowed by an employee
          during a calendar year.
        </li>
        <li>
          Loss of pay can be availed by an employee by applying on HRMS tool for
          approval from immediate reporting manager and head of department.
        </li>
        <li>Leave will be updated as loss of pay on the HRMS tool.</li>
        <p>
          Process for availing leave without pay: Loss of Pay can be availed by
          an employee by applying on HRMS tool for approval from immediate
          reporting manager and head of department. Once approved by the
          immediate reporting manager and department head, leave can be availed
          by the employee. Leave will be updated as loss of pay on the HRMS
          tool.
        </p>
      </ul>
      <h3 className={styles.title}>4. Compensatory off</h3>
      <ul className={styles.list}>
        <li>
          An employee is eligible for compensatory off when he/she has worked on
          an important assignment as per business/project requirement on any of
          the national/festival/declared off day.
        </li>
        <li>
          Approval to work on any such day i.e. national/festival/declared off
          day must be taken by senior management.
        </li>
        <li>
          Compensatory off must be availed within a period of 1 month else it
          will lapse.
        </li>
      </ul>
      <p className={styles.h4}>Process to avail compensatory loss</p>
      <p className={styles.list}>
        Approval of senior management is must for compensatory off. Employees
        who have worked on national/festival/declared off day can avail leave in
        lieu of work done on above mentioned days. The day an employee is taking
        compensatory off he/she must inform the immediate reporting manager,
        once approved, it is the immediate manager's responsibility to inform HR
        about the same.
      </p>
      <h3 className={styles.title}>5. Maternity Leave</h3>
      <ul className={styles.list}>
        <li>
          All confirmed female employees shall be entitled for Maternity leave
          as per maternity benefit act 2016, with full pay for a period of
          continuous 26 weeks for each pregnancy up to a maximum of 2
          confinements.
        </li>
        <li>
          Leave taken for prenatal treatment for the first 7 months of pregnancy
          will be considered as normal leave not maternity leave.
        </li>
        <li>
          A woman employee can take maternity leave earliest 8 weeks before the
          expected date of delivery.
        </li>
      </ul>
      <p className={styles.h5}>Process of Maternity Leave</p>
      <ul className={styles.list}>
        <li>
          Before proceeding on Maternity Leave it is needed to be applied on
          HRMS tool and must be approved by the reporting manager.
        </li>
        <li>
          The woman employee proceeding on Maternity leave must also submit a
          doctor's certificate to HR.
        </li>
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
      <h4 className={styles.list}>Note:</h4>
      <h4>
        <ul className={styles.list}>
          <li>
            Immediate Family includes spouse, siblings, parents, children.
          </li>
          <li>Subject to manager’s approval and work exigency.</li>
          <li>Leave should be applied at least 7 days in advance.</li>
          <li>
            Documentary proof (e.g., wedding card or invitation) may be
            requested for extended leave.
          </li>
          <li>
            The Wedding leaves should only apply under Casual Leave for the
            employees
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
            Sundays) of leave is allowed for any employee at a time.
          </li>
          <li>
            This rule applies to all types of personal leave such as vacation,
            weddings, family functions, etc.
          </li>
          <li>
            Medical or health-related leaves are excluded from this policy.
          </li>
        </ul>
        <p className={styles.list}>
          Any request for leave exceeding 10 days will require special approval
          from the CEO or Directors, and must be justified with sufficient
          reason.
        </p>
      </h4>
      <h3 className={styles.title}>Other Leave Policies</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            If an employee is absent continuously for 7 days beyond sanctioned
            leave with no information, in this case the employee shall be
            considered to have absconded from work on his/her free will. HR will
            take action in this case. First Warning letter will be issued to the
            employee if he/she does not return within 7 days of expiry of
            sanctioned leave. If no response from an employee within 3 days of
            issuance of 1st warning letter, 2nd warning letter will be issued.
            If there is still no response from the said employee, the final
            termination letter will be issued in 3 days after issuance of the
            2nd warning letter.
          </li>
          <li>
            In case of prolonged illness or leave of absence from work an
            employee is supposed to inform the immediate reporting manager at
            regular intervals about their condition and most probable date of
            return. In absence of any communication from employees, serious
            action can be taken by the company.
          </li>
          <li>
            Weekends and any holiday lying between the sanctioned leave periods
            will be excluded and not be counted as leave in case of casual and
            medical leave.
          </li>
          <li>
            In case of planned leave it is employee responsibility to apply for
            leave in advance, however in case of unplanned leave employees must
            regularize leave within 2 days of resuming duty.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>Cancellation of leave</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Approved leave can be cancelled depending upon the circumstances
          </li>
          <li>Leave balance will be updated accordingly on the HRMS tool.</li>
        </ul>
      </h4>
      <h3 className={styles.title}>Extension of leave</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            In case of extension of leave due to any unforeseen circumstances
            the employee must inform the reporting manager in advance. This is
            the case when leave extension has been told verbally or over the
            phone. It is employee responsibility to regularize leave on HRMS
            tool once an employee has resumed back on duty.
          </li>
          <li>
            The extended leave must be applied on the HRMS tool in case of
            planned extension so that both the reporting manager and HR are
            informed automatically.
          </li>
          <li>Leave balance is updated on the HRMS tool automatically.</li>
          <li>
            In case employee overstays without approval it will be treated as
            absence from duty and disciplinary action will be taken against the
            employee.
          </li>
          <li>
            Leave extended without permission will be treated as loss of pay.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>
        Leave calculation on resignation/termination
      </h3>
      <h4 className={styles.h5}>
        In case an employee has resigned from the services or on termination of
        the employee, all the pending leaves will lapse on the last working day
        of the employee.
      </h4>
      <h3 className={styles.title}>Revision of the policy</h3>
      <h4 className={styles.h5}>
        The company reserves the right to revise, modify any or all clauses of
        this policy depending upon demand of business.
      </h4>
    </div>
  );
}

export default index;
