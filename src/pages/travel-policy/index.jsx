import React from "react";
import styles from "./travel.module.css";

function index() {
  return (
    <div>
      <h2 className={styles.header}>Travel Policies</h2>
      <h4 className={styles.header_text}>
        This Business Travel Policy aims to streamline work-related travel for
        employees, ensuring comfort, cost-efficiency, and accountability across
        all levels within the organization. This Travel policy applies to all
        full-time employees of Trade Brains and its subsidiaries.
      </h4>
      <h2 className={styles.title}>1. Applicability</h2>
      <h4 className={styles.list}>
        This policy applies to all employees traveling for official purposes
        such as business meetings, conferences, seminars, events, site visits,
        or client interactions.
      </h4>
      <h4>
        <h3 className={styles.h4}>Accommodation Guidelines</h3>
        <ul className={styles.list}>
          <li>
            Directors and CEOs: Accommodation will be arranged in 5-star hotels.
          </li>
          <li>
            Senior Employees: Accommodation will be arranged in 4-star hotels.
          </li>
          <li>
            Mid to Junior Level Employees: Accommodation will be arranged in
            3-star hotels or budget hotels with a cap of ₹3,000 per night
            (inclusive of taxes).
          </li>
        </ul>
        <p className={styles.note}>
          Note: In cases where company-preferred hotels are unavailable,
          employees must take prior approval from reporting managers for
          alternative arrangements.
        </p>
      </h4>
      <h2 className={styles.title}>2. Travel Mode Guidelines</h2>
      <h3 className={styles.h4}>Air Travel:</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Directors, CEO, and Senior Employees: Eligible for air travel
            (economy class unless specified otherwise).
          </li>
          <li>
            Mid to Junior Level Employees:
            <ul className={styles.list}>
              <li>
                Eligible for train travel (AC class) if the journey duration is
                up to 16 hours.
              </li>
              <li>
                Eligible for flights (economy class) if the journey duration
                exceeds 16 hours or if train connectivity is unavailable or
                impractical.
              </li>
            </ul>
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>Local Conveyance:</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            {" "}
            Cab/taxi fares, metro, bus, and other transport expenses will be
            reimbursed upon submission of receipts, subject to managerial
            approval.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>3. Daily Allowance (Food & Refreshments)</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Mid to Junior Level Employees: Will be provided a daily allowance of
            ₹500 for food, snacks, and refreshments during travel days.
          </li>
          <li>
            Senior Employees and Above: Actual food expenses to be reimbursed
            upon bill submission, subject to reasonable limits.
          </li>
        </ul>
        <p className={styles.note}>
          Note: Alcoholic beverages and luxury dining expenses will not be
          reimbursed unless explicitly approved for client-related hospitality.
        </p>
      </h4>
      <h3 className={styles.title}>4. Reimbursements & Approvals</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            All travel-related expenses (transportation, local travel, internet
            usage, parking, tolls, etc.) will be reimbursed only upon prior
            approval from reporting managers and submission of valid receipts.
          </li>
          <li>
            Reimbursement claims must be submitted within 7 working days
            post-travel.
          </li>
          <li>
            In case of emergency or ad-hoc expenses, employees must inform the
            reporting manager as soon as possible for later approval.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>5. Travel Booking Process</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Travel and hotel bookings should preferably be done through the
            company’s admin/HR team or approved travel partners.
          </li>
          <li>
            In case of self-booking, prior budget approval must be obtained from
            the reporting manager.
          </li>
        </ul>
      </h4>

      <h3 className={styles.title}>6. General Guidelines</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Employees are expected to maintain professional behavior during
            travel and at venues.
          </li>
          <li>
            Personal trips or detours during official travel are not permitted
            unless explicitly approved and self-funded.
          </li>
          <li>
            In case of extended stays for personal reasons, employees must bear
            the additional cost.
          </li>
          <li>Misuse or fraudulent claims may lead to disciplinary action.</li>
        </ul>
      </h4>

      <h3 className={styles.title}>7. Safety and Emergencies</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            Employees must keep their reporting manager informed during travel.
          </li>
          <li>
            In case of any emergency (medical, travel issues, etc.), the
            employee should immediately inform the company for necessary
            support.
          </li>
        </ul>
      </h4>

      <h3 className={styles.title}>8. Complimentary Offs (Comp-offs)</h3>
      <h4>
        <ul className={styles.list}>
          <li>
            If an employee is traveling for work and is required to work on a
            declared holiday by the company, they will be eligible for this
            Compensatory Off.
          </li>
          <li>
            The Compensatory Off will be equivalent to the number of holidays
            worked, subject to manager approval.
          </li>
          <li>
            The Compensatory Off must be availed within 30 days of approval,
            unless otherwise permitted.
          </li>
        </ul>
      </h4>
      <h3 className={styles.title}>9. Exceptions</h3>
      <h4 className={styles.list}>
        Any exceptions or variations from this policy require written approval
        from the CEO or designated authority.
      </h4>
      <h3 className={styles.title}>Policy Review & Updates</h3>
      <h4 className={styles.list}>
        This policy will be periodically reviewed and updated as per business
        needs and operational changes.
      </h4>
    </div>
  );
}

export default index;
