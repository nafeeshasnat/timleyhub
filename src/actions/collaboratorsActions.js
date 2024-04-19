export const fetchCollaborators = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.user.userDetails;
    const userID = user.role === 'comAdmin' ? user._id : user.company;
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/collaborators/${userID}`); // Adjust the API endpoint as needed
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
