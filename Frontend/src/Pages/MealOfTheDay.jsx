import React, { useEffect, useState } from "react";
import Styles from "../Css/Home.module.css";
import { note, toastStyle } from "../Constants/general";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

const MealOfTheDay = ({ selectedDate }) => {
  const [menu, setMenu] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchMealData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/menu/${selectedDate.format("dddd")}`
        );
        if (response.status === 200) {
          setMenu(
            response.data.map((item) => ({
              mealType: item.mealType,
              dishName: item.dishName,
            }))
          );
        }
      } catch (error) {
        toast.error(error.response?.data || error.message, toastStyle);
      }
      finally{
        setLoading(false);
      }
    };
    fetchMealData();
  }, [selectedDate]);

  return (
    <>
    <div className="text-start mx-2 my-3">
      <h5>Meal of the day</h5>
      <div className={`${Styles.food} row text-light`}>
        <div className="col-6">
          <h4>Lunch</h4>
          <ul>
            {menu.map(
              (item, i) => item.mealType === "LUNCH" && <li key={i}>{item.dishName}</li>
            )}
          </ul>
        </div>
        <div className="col-6">
          <h4>Dinner</h4>
          <ul>
            {menu.map(
              (item, i) => item.mealType === "DINNER" && <li key={i}>{item.dishName}</li>
            )}
          </ul>
        </div>
        <footer>Note: {note}</footer>
      </div>
    </div>
    {loading && <Spinner />}
    </>
  );
};

export default MealOfTheDay;
