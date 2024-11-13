import React from "react";
import Styles from "../Css/TermsAndCondition.module.css";
import { Link } from "react-router-dom";

const TermAndCondition = () => {
  return (
    <div className={`${Styles["term-main"]} container`} >
      <h2 >Terms and Conditions</h2>
      <p >
        Welcome to Book My Meal, an exclusive meal-ordering platform for Rishabh
        Software employees. By accessing and using the Book My Meal platform,
        you agree to comply with and be bound by these Terms and Conditions.
        Please read these terms carefully.
      </p>
      <h5 className={Styles.h5}>1. Eligibility</h5>
      <p>
        Book My Meal is available exclusively to employees of Rishabh Software.
        B y using our platform, you confirm that you are a current Rishabh
        Software employee and are authorized to access and use this service.
      </p>
      <h5 className={Styles.h5}>2. Account Creation and Responsibilities</h5>
      <ul>
        <li>
          <b>Account Information:</b> To use Book My Meal, you must create an
          account using your Rishabh Software credentials. You agree to provide
          accurate, current, and complete information during registration.
        </li>
        <li>
          <b>Account Security:</b> You are responsible for maintaining the
          confidentiality of your account information. You agree to notify us
          immediately of any unauthorized use of your account.
        </li>
        <li>
          <b>Termination of Access:</b> We reserve the right to suspend or
          terminate your account if you violate any of these terms or engage in
          fraudulent or unauthorized activity on the platform.
        </li>
      </ul>
      <h5 className={Styles.h5}>3. Ordering and Payments</h5>
      <ul>
        <li>
          Order Accuracy: Please review your order carefully before submitting
          it. Once an order is placed, changes or cancellations may not be
          possible.
        </li>
        <li>
          Payment: Payment is due at the time of order submission. Accepted
          payment methods are provided on the platform.
        </li>
        <li>
          Refunds and Cancellations: Refunds are only available under specific
          circumstances, such as order errors or issues with meal quality.
          Please refer to our Refund Policy for more details.
        </li>
      </ul>
      <h5 className={Styles.h5}>4. Service Availability</h5>
      <p>
        We strive to ensure the availability of Book My Meal, but we cannot
        guarantee uninterrupted service. We reserve the right to modify,
        suspend, or discontinue the platform at any time without notice.
      </p>
      <h5 className={Styles.h5}>5. Usage Guidelines</h5>
      <ul>
        <li>
          Appropriate Use: You agree to use Book My Meal solely for ordering
          meals for personal consumption and in accordance with Rishabh Software
          policies.
        </li>
        <li>
          Prohibited Activities: You may not use the platform for any illegal or
          unauthorized purpose, including but not limited to fraudulent orders,
          unauthorized access, or disruption of services.
        </li>
        <li>
          Compliance: You agree to comply with all applicable local laws and
          Rishabh Software policies while using Book My Meal.
        </li>
      </ul>
      <h5 className={Styles.h5}>6. Privacy</h5>
      <p>
        Your use of Book My Meal is subject to our Privacy Policy, which
        outlines how we collect, use, and protect your personal information. By
        using the platform, you agree to our Privacy Policy.
      </p>
      <h5 className={Styles.h5}>7. Limitation of Liability</h5>
      <p>
        Book My Meal and its affiliates shall not be liable for any indirect,
        incidental, or consequential damages arising out of or in connection
        with your use of the platform, including but not limited to meal
        quality, order errors, or delays.
      </p>
      <h5 className={Styles.h5}>8. Changes to Terms and Conditions</h5>
      <p>
        We reserve the right to update or modify these Terms and Conditions at
        any time. Any changes will be effective immediately upon posting on the
        platform. It is your responsibility to review the Terms and Conditions
        periodically.
      </p>
      <h5 className={Styles.h5}>9. Contact Us</h5>
      <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at <Link className="text-danger" to="mailto:bookmymeal@rise.com">
          bookmymeal@rise.com
        </Link>.</p>
    </div>
  );
};

export default TermAndCondition;
