
const reducer = (state = { screen: 'MAIN' }, action) => {
  switch (action.type) {
    case 'USER_SELECTED':
      return { ...state, name: action.name, screen: "DIAGRAM" };
    case 'BACK_TO_MAIN':
      return { ...state, name: action.name, screen: "MAIN" };
    case 'NEXT_SCREEN':
      return { ...state, name: action.name, screen: "LIST" };
    default:
      return state;
  }

};

export default reducer;
