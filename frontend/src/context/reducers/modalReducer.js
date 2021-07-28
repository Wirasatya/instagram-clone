import { GLOBALTYPES } from "../globalTypes";

const modalReducer = (state, action) => {
  switch (action.type) {
    case GLOBALTYPES.MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default modalReducer;
