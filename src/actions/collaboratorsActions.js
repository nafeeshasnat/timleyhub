export const fetchCollaborators = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.user.userDetails;
    console.log(user);
    const userID = user.role === 'comAdmin' ? user._id : user.company;
    console.log(userID)
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
