import React from "react";
import Styles from "../Css/PrivacyPolicy.module.css";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className={`${Styles["priv-main"]} container`}>
      <h2>Privacy Policy</h2>
      <p>
        Book My Meal values your privacy and is committed to protecting the
        personal information of Rishabh Software employees who use our platform.
        This Privacy Policy explains how we collect, use, share, and safeguard
        your information when you use Book My Meal's services.
      </p>
      <h5 className={Styles.h5}>1. Information We Collect</h5>
      <p>
        To provide a seamless meal-ordering experience, we may collect the
        following types of information:
      </p>
      <ul>
        <li>
          <b>Personal Identification Information:</b> Such as your name, email
          address, and employee ID to verify your identity and manage your
          account.
        </li>
        <li>
          <b>Contact Information:</b> For order notifications, delivery
          confirmations, and customer service communications.
        </li>
        <li>
          <b>Order Details:</b> Information about your meal preferences, order
          history, and payment details to enhance your experience.
        </li>
        <li>
          <b>Technical Information:</b> Data about your device, IP address, and
          browsing activity for service improvements and security.
        </li>
      </ul>
      <h5 className={Styles.h5}>2. How We Use Your Information</h5>
      <p>Book My Meal uses your information for the following purposes:</p>
      <ul>
        <li>
          <b>Order Processing:</b> To process and deliver your meal orders
          efficiently.
        </li>
        <li>
          <b>Account Management:</b> To manage your account and authenticate
          your access to our platform.
        </li>
        <li>
          <b>Personalized Experience:</b> To tailor our offerings to your
          preferences and dietary requirements.
        </li>
        <li>
          <b>Communication:</b> To send order confirmations, service updates,
          and respond to customer support inquiries.
        </li>
        <li>
          <b>Service Improvement:</b> To analyze platform usage, troubleshoot
          issues, and enhance our services.
        </li>
      </ul>
      <h5 className={Styles.h5}>3. Information Sharing</h5>
      <p>
        Your personal information is kept confidential and will only be shared
        in limited circumstances, including:
      </p>
      <ul>
        <li>
          <b>Service Providers:</b> With third-party partners who assist in
          order processing and delivery, under strict confidentiality
          agreements.
        </li>
        <li>
          <b>Legal Compliance:</b> As required by law or to protect our rights,
          privacy, and property.
        </li>
        <li>
          <b>Rishabh Software:</b> For internal reporting and compliance with
          Rishabh Software policies.
        </li>
      </ul>
      <h5 className={Styles.h5}>4. Data Security</h5>
      <p>
        We implement industry-standard security measures to protect your
        information from unauthorized access, alteration, or disclosure. While
        we strive to secure your data, no method of electronic storage is 100%
        secure. We encourage you to use a strong password and keep your account
        details confidential.
      </p>
      <h5>5. Retention of Information</h5>
      <p>
        We retain your personal information only as long as necessary to fulfill
        the purposes outlined in this Privacy Policy and as required by law.
      </p>
      <h5 className={Styles.h5}>6. Your Rights</h5>
      <p>
        You have the right to access, update, or delete your personal
        information. If you would like to make any changes, please contact us at{" "}
        <Link className="text-danger" to="mailto:bookmymeal@rise.com">
          bookmymeal@rise.com
        </Link>
        .
      </p>
      <h5 className={Styles.h5}>7. Changes to This Privacy Policy</h5>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices. We will notify you of any significant changes via
        email or a notice on our platform.
      </p>
      <h5 className={Styles.h5}>8. Contact Us</h5>
      <p>If you have any questions or concerns about this Privacy Policy, please reach out to us at <Link className="text-danger" to="mailto:bookmymeal@rise.com">
          bookmymeal@rise.com
        </Link>.</p>
    </div>
  );
};

export default PrivacyPolicy;
