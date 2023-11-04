import { logout } from "~/api/Users";

export default (state, action) => {
  switch (action.type) {
    case "GOOGLE_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      localStorage.removeItem("user");
      logout();

      return {
        ...state,
        url: "",
        user: [],
      };
    default:
      return state;
  }
};
