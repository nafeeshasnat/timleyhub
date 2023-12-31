const initialState = {
  collaborators: [],
  error: null,
};

const collaboratorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COLLABORATORS_SUCCESS':
      return {
        ...state,
        collaborators: action.payload,
        error: null,
      };
    case 'FETCH_COLLABORATORS_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default collaboratorsReducer;