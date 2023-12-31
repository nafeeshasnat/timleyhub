export const fetchCollaborators = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.user.userDetails;
    const userID = user._id;
    const response = await fetch(`http://localhost:5001/api/collaborators/${userID}`); // Adjust the API endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch collaborators');
    }
    const collaborators = await response.json();
    dispatch({
      type: 'FETCH_COLLABORATORS_SUCCESS',
      payload: collaborators,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_COLLABORATORS_ERROR',
      payload: error.message,
    });
  }
};
