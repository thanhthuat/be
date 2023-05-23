import { mockResponsePopular, mockResponse, mockResponseDefault } from "../constant/layout.js";

export const getLayout = async ({ type, date, content }) => {
  console.log("type", typeof type, type);
  let data = {};

  try {
    switch (type) {
      case "home":
        data = mockResponse;
        break;
      case "category":
        data = mockResponsePopular;
        break;
      case "popular":
        data = mockResponsePopular;
        break;

      default:
        data = mockResponseDefault;
        break;
    }
  } catch (error) {
    if (error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
  return data;
};
