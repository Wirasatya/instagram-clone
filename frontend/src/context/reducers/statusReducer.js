import { GLOBALTYPES } from "../globalTypes";

const statusReducer = (state, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
