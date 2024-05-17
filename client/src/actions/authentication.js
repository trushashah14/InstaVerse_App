import * as api from "../api"; // Import API functions from the api module
import { AUTHENTICATION } from "../constants/actionTypes"; // Import action type constant

// Action creator function to sign up a user
const signup = (formValues, navigate) => async dispatch => {
  try {
    // Send sign up request to the API
    const { data } = await api.signup(formValues);

    // Dispatch authentication action with received data
    dispatch({
      type: AUTHENTICATION,
      data: data
    });

    // Navigate to the homepage after successful sign up
    navigate("/");
  } catch (error) {
    // Log any errors that occur during sign up
    console.log(error);
  }
};

// Action creator function to log in a user
const login = (formValues, navigate) => async dispatch => {
  try {
    // Send login request to the API
    const { data } = await api.login(formValues);

    // Dispatch authentication action with received data
    dispatch({
      type: AUTHENTICATION,
      data: data
    });

    // Navigate to the homepage after successful login
    navigate("/");
  } catch (error) {
    // Log any errors that occur during login
    console.log(error);
  }
};

// Export signup and login action creator functions
export { signup, login };
