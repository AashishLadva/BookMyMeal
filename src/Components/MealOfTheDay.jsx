import React from "react";
import Styles from "../Css/Home.module.css";

const MealOfTheDay = () => {
    
  const lunch = ["Chhole", "Giloda", "Punjabi dal", "Rice", "Roti"];
  const dinner = ["Choli Red", "Paneer Tikka", "Veg Pulao", "Curd", "Roti"];
  const note = "Menu is subject to change on basis of availability.";
  return (
    <div className="text-start mx-2 my-3">
      <h5>Meal of the day</h5>
      <div className={`${Styles.food} row text-light`}>
        <div className="col-6">
          <h4>Lunch</h4>
          <ul>
            {lunch.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          <h4>Dinner</h4>
          <ul>
            {dinner.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <footer>Note: {note}</footer>
      </div>
    </div>
  );
};

export default MealOfTheDay;
