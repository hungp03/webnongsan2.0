import icons from "./icons";
const { FaRegStar, FaStar } = icons;

export const createSlug = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-");
  

export const formatMoney = (money) => Number(money?.toFixed(1)).toLocaleString();
 
