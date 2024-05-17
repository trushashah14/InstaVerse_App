import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";

// Reducer function for handling authentication related actions
const authenticationReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    // Case for handling authentication action
    case AUTHENTICATION:
      // Storing user authentication data in local storage
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      // Returning updated state with user authentication data
      return { ...state, authData: action?.data };

    // Case for handling logout action
    case LOGOUT:
      // Clearing user authentication data from local storage
      localStorage.clear();
      // Returning state with cleared authentication data
      return {
        ...state,
        authData: null,
      };

    // Default case to return current state for unknown actions
    default:
      return state;
  }
};

export default authenticationReducer;
