import * as api from "../api"; // Import API functions from the api module
import { FETCH_ALL_STORIES, CREATE_STORY, UPDATE_STORY, DELETE_STORY } from "../constants/actionTypes"; // Import action type constants

// Action creator function to fetch all stories
export const getStories = () => async (dispatch) => {
  try {
    // Send request to API to fetch all stories
    const { data } = await api.getStories();

    // Dispatch action to store fetched stories in the Redux store
    dispatch({ type: FETCH_ALL_STORIES, payload: data });
  } catch (error) {
    // Log any errors that occur during fetching of stories
    console.log(error.message);
  }
};

// Action creator function to create a new story
export const createStory = (story) => async (dispatch) => {
  try {
    // Send request to API to create a new story
    const { data } = await api.createStory(story);

    // Dispatch action to add the created story to the Redux store
    dispatch({ type: CREATE_STORY, payload: data });
  } catch (error) {
    // Log any errors that occur during creation of story
    console.log(error.message);
  }
};

// Action creator function to update an existing story
export const updateStory = (id, story) => async (dispatch) => {
  try {
    // Send request to API to update the story with the given ID
    const { data } = await api.updateStory(id, story);

    // Dispatch action to update the story in the Redux store
    dispatch({ type: UPDATE_STORY, payload: data });

    // Fetch all stories again to ensure updated data is displayed
    dispatch(getStories());
  } catch (error) {
    // Log any errors that occur during update of story
    console.log(error.message);
  }
};

// Action creator function to delete a story
export const deleteStory = (id) => async (dispatch) => {
  try {
    // Send request to API to delete the story with the given ID
    await api.deleteStory(id);

    // Dispatch action to remove the deleted story from the Redux store
    dispatch({ type: DELETE_STORY, payload: id });

    // Fetch all stories again to ensure updated data is displayed
    dispatch(getStories());
  } catch (error) {
    // Log any errors that occur during deletion of story
    console.log(error.message);
  }
};

// Action creator function to like a story
export const likeStory = (id) => async (dispatch) => {
  try {
    // Send request to API to like the story with the given ID
    const { data } = await api.likeStory(id);

    // Dispatch action to update the story in the Redux store with the new like count
    dispatch({ type: UPDATE_STORY, payload: data });
  } catch (error) {
    // Log any errors that occur during liking of story
    console.log(error.message);
  }
};
