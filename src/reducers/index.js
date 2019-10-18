
const reducer = (state = { isShownItem: false }, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, name: action.name, isShownItem: true };
    case 'BACK_TO_USER':
      return { ...state, name: action.name, isShownItem: false };
    default:
      return state;
  }

};

export default reducer;
