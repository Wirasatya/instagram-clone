import { GLOBALTYPES } from "../globalTypes";

const themeReducer = (state, action) => {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
