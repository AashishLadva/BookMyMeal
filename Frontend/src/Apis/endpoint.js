import cookies from "js-cookie";

// const { id } = JSON.parse(cookies.get("UserCookie"));
const BASE_URL = "http://localhost:8080";

export const API_URLS = {
  LOGIN: `${BASE_URL}/employees/login`,
  BOOK_MEAL: `${BASE_URL}/meal-booking/booking`,
  CHANGE_PASSWORD: `${BASE_URL}/employees/changePassword`,
  FETCH_HOLIDAYS: `${BASE_URL}/meal-booking/getHolidays`,
  DISPAL_BOOKING:(id)=> `${BASE_URL}/meal-booking/${id}/display-booking`,
  GET_COUPON_DETAILS: (id,hasLunch, selectedDate) =>
    `${BASE_URL}/coupons/${id}/${hasLunch ? 1 : 2}/${selectedDate.format(
      "YYYY-MM-DD"
    )}/getCouponDetails`,
  GET_MENU: (selectedDate) =>
    `${BASE_URL}/menu/${selectedDate.format("dddd")}/getMenu`,
  VIEW_BOOKINGS: (id,mealType) =>
    `${BASE_URL}/meal-booking/${id}/${
      mealType === "Lunch" ? 1 : 2
    }/view-booking`,
  CANCEL_BOOKING: (id,mealType,selectedDate) =>
    `${BASE_URL}/meal-booking/${id}/${
      mealType === "LUNCH" ? 1 : 2
    }/${selectedDate.format("YYYY-MM-DD")}/cancel-booking`,
};
