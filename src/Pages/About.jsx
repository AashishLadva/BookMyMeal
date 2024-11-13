import React from "react";
import Styles from "../Css/About.module.css";

const About = () => {
  return (
    <div className={`${Styles["about-main"]} container`}>
      <h2>About Book My Meal</h2>
      <p>
        Welcome to Book My Meal - a convenient and exclusive meal-ordering
        platform designed specifically for Rishabh Software employees. We
        understand the demands of a busy workday, and our goal is to make meal
        planning and ordering easy and enjoyable for you.
      </p>
      <p>
        Book My Meal offers a curated selection of delicious meals from trusted
        local providers, so you can enjoy a variety of cuisines without leaving
        the office. From hearty lunches to light snacks, our service is here to
        keep you fueled and focused throughout the day.
      </p>
      <h3>Why Use Book My Meal?</h3>
      <p>
        <ul>
          <li>
            <b>Exclusive for Rishabh Employees:</b> A service tailored just for
            you, with meals suited to your tastes and dietary needs.
          </li>
          <li>
            <b>Quick and Simple Ordering:</b> Place your orders in advance or on
            the go through our user-friendly platform.
          </li>
          <li>
            <b> On-Time Delivery:</b > We make sure your meal arrives fresh and
            right on time, so you can enjoy a well-deserved break.
          </li>
        </ul>
      </p>
      <p>
        With Book My Meal, your next meal is just a click away. Let us take care
        of your lunch, so you can focus on doing what you do best at Rishabh
        Software. Enjoy the convenience, taste, and quality that Book My Meal
        brings to your table!
      </p>
    </div>
  );
};

export default About;
