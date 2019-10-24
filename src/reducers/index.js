
const reducer = (state = { screen: 'MAIN' }, action) => {
  switch (action.type) {
    case 'USER_SELECTED':
      return { ...state, screen: "DIAGRAM" };
    case 'BACK_TO_MAIN':
      return { ...ValidityState, screen: "MAIN" };
    case 'TO_SCREEN_TWO':
      return { ...state, screen: "LIST" };
    default:
      return state;
  }
};

export default reducer;
