import React from "react";
import Styles from "../Css/About.module.css";

const About = () => {
  return (
    <div className={`${Styles["about-main"]} container`}>
      <h2>About Book My Meal</h2>
      <p>
        Welcome to **Book My Meal** - a convenient and exclusive meal-ordering
        platform designed specifically for Rishabh Software employees. We
        understand the demands of a busy workday, and our goal is to make meal
        planning and ordering easy and enjoyable for you.
      </p>
      <p>
        **Book My Meal** offers a curated selection of delicious meals from
        trusted local providers, so you can enjoy a variety of cuisines without
        leaving the office. From hearty lunches to light snacks, our service is
        here to keep you fueled and focused throughout the day.
      </p>
      <h3>Why Use Book My Meal?</h3>
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
          <b>On-Time Delivery:</b> We make sure your meal arrives fresh and
          right on time, so you can enjoy a well-deserved break.
        </li>
        <li>
          <b>Healthy and Tasty Options:</b> Choose from a wide variety of dishes
          that cater to both flavor and nutrition, ensuring your energy stays up
          throughout the day.
        </li>
        <li>
          <b>Trusted Vendors:</b> We work with only the best local food
          providers, ensuring high-quality meals with every order.
        </li>
      </ul>
      <h3>What We Offer</h3>
      <p>
        Whether you're in the mood for a hot and comforting meal or a quick,
        healthy bite, **Book My Meal** has got you covered. Here's what makes us
        stand out:
      </p>
      <ul>
        <li>
          <b>Variety of Cuisines:</b> From classic Indian meals to international
          delicacies, we have something for every palate.
        </li>
        <li>
          <b>Meal Customization:</b> Personalize your meals based on portion
          size, spice level, or dietary preferences.
        </li>
        <li>
          <b>Special Dietary Options:</b> Whether you're vegetarian, vegan, or
          require gluten-free meals, we've got plenty of choices for you.
        </li>
        <li>
          <b>Weekly Specials:</b> Look forward to exciting new dishes every week
          that keep your mealtime fresh and interesting.
        </li>
        <li>
          <b>Combo Deals:</b> Save more with meal combos that include drinks and
          sides.
        </li>
      </ul>
      <h3>How It Works</h3>
      <p>Using **Book My Meal** is simple and hassle-free:</p>
      <ol>
        <li>
          <b>Sign Up:</b> Log in to our platform using your employee
          credentials.
        </li>
        <li>
          <b>Browse Menus:</b> Explore a variety of menus and pick your favorite
          meals.
        </li>
        <li>
          <b>Place Your Order:</b> Select your items and place your order in
          just a few clicks.
        </li>
        <li>
          <b>Track Delivery:</b> Stay updated on your order status and estimated
          delivery time.
        </li>
        <li>
          <b>Enjoy Your Meal:</b> Relish the delicious food delivered straight
          to your workplace.
        </li>
      </ol>
      <h3>Our Commitment</h3>
      <p>
        At **Book My Meal**, we are committed to ensuring the highest standards
        of service and quality:
      </p>
      <ul>
        <li>
          <b>Fresh Ingredients:</b> All meals are prepared using fresh,
          high-quality ingredients to ensure great taste and nutrition.
        </li>
        <li>
          <b>Timely Service:</b> We value your time and guarantee timely meal
          delivery.
        </li>
        <li>
          <b>Employee Satisfaction:</b> Your satisfaction is our top priority.
          Our team is always ready to assist you with any queries or issues.
        </li>
        <li>
          <b>Eco-Friendly Packaging:</b> We care for the environment and use
          sustainable packaging wherever possible.
        </li>
      </ul>
      <p>
        With **Book My Meal**, your next meal is just a click away. Let us take
        care of your lunch, so you can focus on doing what you do best at
        Rishabh Software. Enjoy the convenience, taste, and quality that Book My
        Meal brings to your table!
      </p>
    </div>
  );
};

export default About;
